import * as React from 'react';
import { FC } from 'react';
import {
  List,
  ListProps,
  Datagrid,
  TextField,
  DateField,
  ImageField,
  ReferenceField,
  NumberField,
  Filter,
  FilterProps,
  DateInput,
  UrlField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  FunctionField,
  EditButton,
  usePermissions,
  TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { COLLECTION_APP, COLLECTION_APP_BUILD } from '../utils';
import { LinkField } from '../components/fields';

const useStyles = makeStyles(theme => ({
  hiddenOnSmallScreens: {
    display: 'table-cell',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  image: {
    maxWidth: 120,
  },
}));

const AppFilter = (props: any) => {
  return (
    <Filter>
      <TextInput label="Title" source="title" defaultValue="" />
    </Filter>
  );
};

const ResourceList: FC<ListProps> = props => {
  const classes = useStyles();
  // const { loaded, permissions } = usePermissions();
  console.log('applist: ', props);
  return (
    <List
      {...props}
      perPage={25}
      sort={{ field: 'updatedAt', order: 'DESC' }}
      bulkActionButtons={false}
      filters={<AppFilter />}
    >
      <Datagrid optimized rowClick="show">
        <TextField label="id" source="id" />
        <TextField source="title" />
        <NumberField source="priority" />
        <DateField source="updatedAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ResourceList;
