import * as React from 'react';
import { FC } from 'react';
import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EditProps,
  FormTab,
  NumberInput,
  Pagination,
  ReferenceInput,
  ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  TextField,
  TextInput,
  Show,
  ShowProps,
  NumberField,
  ImageField,
  UrlField,
  RichTextField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  FieldProps,
  ReferenceField,
  FunctionField,
  CreateButton,
  BooleanField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {
  COLLECTION_APP,
  COLLECTION_APP_BINARY,
  COLLECTION_APP_BUILD,
  COLLECTION_APP_PROVIDER,
  COLLECTION_APP_VERSION,
  COLLECTION_CATEGORY,
  COLLECTION_TAG,
} from '../utils';
import { Link } from 'react-router-dom';
import { AppVersionField } from '../components/fields';
import { LinkField } from '../components/fields/LinkField';
import { JsonField } from 'react-admin-json-view';
import { CreateButtonWithParams } from '../components/buttons';
import { CustomArrayField } from '../components/fields';
import { CustomToolbar } from '../components/toolbars';

const useStyles = makeStyles({
  comment: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tab: {
    display: 'block',
  },
  dInlineBlock: {
    wordBreak: 'break-word',
    display: 'inline-block',
    width: '50%',
  },
});

const ResourceShow: FC<ShowProps> = props => {
  const classes = useStyles();
  return (
    <Show {...props}>
      <TabbedForm redirect="show" toolbar={<CustomToolbar />}>
        <FormTab
          label="resources.apps.tabs.details"
          contentClassName={classes.tab}
        >
          <TextField label="id" source="id" />
          <TextField source="name" />
          <TextField source="name_with_slug" />
          <BooleanField source="featured" />
          <BooleanField source="publish_ready" />
          <TextField source="made_country" />
          <NumberField source="category_id" />
          <TextField source="gender" />
          <JsonField
            source="main_image"
            // addLabel={true}
            jsonString={true}
            />
          <TextField source="description" />
          <NumberField source="code" />
          <NumberField source="position" />
          <JsonField
            source="color_variations_sorter"
            // addLabel={true}
            jsonString={true}
            />
          <TextField source="product_properties" />
          <TextField source="seo" />
          <TextField source="version_name" />
          <TextField source="version_priority" />
          <NumberField source="price" />
          <NumberField source="scheduled_event_id" />
          <DateField source="scheduled_end_at" />
          <DateField source="updated_at" />
          <DateField source="updated_at" />
          <DateField source="created_at" />
        </FormTab>
      </TabbedForm>
    </Show>
  );
};

export default ResourceShow;
