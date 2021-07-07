import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from 'react-admin';

export default (apiUrl: string, httpClient = fetchUtils.fetchJson) => {
  const convertResponseReference = (obj: any) => {
    return;
    if (!obj) return obj;
    if (Array.isArray(obj)) {
      for (const o of obj) {
        for (const key of Object.keys(o)) {
          if (key.endsWith('Ids') && o[key]) {
            try {
              const data = JSON.parse(o[key]);
              o[key] = data;
            } catch (error) {}
          }
        }
      }
    } else {
      for (const key of Object.keys(obj)) {
        if (key.endsWith('Ids') && obj[key]) {
          try {
            const data = JSON.parse(obj[key]);
            obj[key] = data;
          } catch (error) {}
        }
      }
    }
  };

  const convertRequestReference = (obj: any) => {
    return;
    if (!obj) return obj;
    if (Array.isArray(obj)) {
      for (const o of obj) {
        for (const key of Object.keys(o)) {
          if (key.endsWith('Ids') && o[key]) {
            try {
              const data = JSON.stringify(o[key]);
              o[key] = data;
            } catch (error) {}
          }
        }
      }
    } else {
      for (const key of Object.keys(obj)) {
        if (key.endsWith('Ids') && obj[key]) {
          try {
            const data = JSON.stringify(obj[key]);
            obj[key] = data;
          } catch (error) {}
        }
      }
    }
  };
  const composeFilter = (paramsFilter: any) => {
    if (
      paramsFilter === '' ||
      (typeof paramsFilter.q !== 'undefined' && paramsFilter.q === '')
    ) {
      paramsFilter = {};
    }

    const flatFilter = fetchUtils.flattenObject(paramsFilter);
    const filter = Object.keys(flatFilter).map(key => {
      const splitKey = key.split('||');
      const ops = splitKey[1] ? splitKey[1] : 'cont';
      let field = splitKey[0];

      if (field.indexOf('_') === 0 && field.indexOf('.') > -1) {
        field = field.split(/\.(.+)/)[1];
      }
      return { field, operator: ops, value: flatFilter[key] };
    });
    return filter;
  };
  const convertDataRequestToHTTP = (
    type: string,
    resource: string,
    params: any
  ) => {
    let url = '';
    const options: any = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { ['0']: orCondition, ...andCondition } = params.filter;

        const andConditionObject = composeFilter(andCondition).reduce(
          (prev, item) => {
            prev[item.field] = {
              [item.operator]: item.value,
            };
            return prev;
          },
          {} as any
        );
        const query = RequestQueryBuilder.create(
          !!orCondition
            ? {
                search: {
                  $or: composeFilter(orCondition).map(item => ({
                    [item.field]: {
                      [item.operator]: item.value,
                    },
                    ...andConditionObject,
                  })),
                },
              }
            : {
                filter: composeFilter(andCondition) as any,
              }
        )
          .setLimit(perPage)
          .setPage(page)
          .sortBy(params.sort)
          .setOffset((page - 1) * perPage)
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case GET_ONE: {
        url = `${apiUrl}/${resource}/${params.id}`;

        break;
      }
      case GET_MANY: {
        const query = RequestQueryBuilder.create()
          .setFilter({
            field: 'id',
            operator: CondOperator.IN,
            value: `${params.ids}`,
          })
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const filter = composeFilter(params.filter) as any;

        filter.push({
          field: params.target,
          operator: CondOperator.EQUALS,
          value: params.id,
        });

        const query = RequestQueryBuilder.create({
          filter,
        })
          .sortBy(params.sort)
          .setLimit(perPage)
          .setOffset((page - 1) * perPage)
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case UPDATE: {
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PATCH';
        // delete params.data.id;
        convertRequestReference(params.data);
        options.body = JSON.stringify(params.data);
        break;
      }
      case CREATE: {
        options.method = 'POST';
        convertRequestReference(params.data);
        if (Array.isArray(params.data)) {
          url = `${apiUrl}/${resource}/bulk`;
          options.body = JSON.stringify({ bulk: params.data });
          break;
        }
        url = `${apiUrl}/${resource}`;
        options.body = JSON.stringify(params.data);
        break;
      }
      case DELETE: {
        url = `${apiUrl}/${resource}/${params.id}`;
        if (!!params.previousData) {
          options.body = JSON.stringify(params.previousData);
        }

        options.method = 'DELETE';
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  const convertHTTPResponse = (
    response: any,
    type: string,
    resource: string,
    params: any
  ) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        convertResponseReference(json.data?.data || json.data);
        console.log('Data response: ', {
          data: json.data?.data?.data || json.data?.data || json.data,
          total: json.data?.data?.total || json.data?.total,
        });
        return {
          data: json.data?.data || json.data,
          total: json.data?.total,
        };
      case CREATE:
        convertResponseReference(params.data);
        console.log('Data responsecreate: ', json);
        return { data: json.data?.data || json.data };
      default:
        convertResponseReference(json.data?.data || json.data);
        console.log('Data responseone: ', json);
        return { data: json.data?.data || json.data };
    }
  };

  return (type: string, resource: string, params: any) => {
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id: any) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
          })
        )
      ).then(responses => ({
        data: responses.map((response: any) => response.json),
      }));
    }
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id: any) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
          })
        )
      ).then(responses => ({
        data: responses.map((response: any) => response.json),
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
