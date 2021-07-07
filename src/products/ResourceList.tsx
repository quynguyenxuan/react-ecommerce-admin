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
  BooleanField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { COLLECTION_APP, COLLECTION_APP_BUILD } from '../utils';
import { LinkField } from '../components/fields';
import { JsonField } from 'react-admin-json-view';

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
      sort={{ field: 'created_at', order: 'asc' }}
      bulkActionButtons={false}
      filters={<AppFilter />}
    >
      <Datagrid optimized rowClick="show">
        <TextField label="id" source="id" />
        <TextField source="name" />
        <TextField source="name_with_slug" />
        <BooleanField source="featured" />
        <BooleanField source="publish_ready" />
        <TextField source="made_country" />
        <NumberField source="category_id" />
        <TextField source="gender" />
        {/* <JsonField
            source="main_image"
            // addLabel={true}
            jsonString={true}
            /> */}
        {/* <ImageField source="main_image" /> */}
        {/* <TextField source="description" /> */}
        <NumberField source="code" />
        <NumberField source="position" />
        {/* <TextField source="color_variations_sorter"/> */}
        <TextField source="product_properties"/>
        {/* <TextField source="seo"/> */}
        <TextField source="version_name" />
        <TextField source="version_priority" />
        <NumberField source="price" />
        <NumberField source="scheduled_event_id"/>
        <DateField source="scheduled_end_at" />
        <DateField source="updated_at" />
        <DateField source="updated_at" />
        <DateField source="created_at" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ResourceList;
