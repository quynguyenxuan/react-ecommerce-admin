import * as React from 'react';
import { FC } from 'react';
import {
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EditProps,
  FormTab,
  ImageField,
  ImageInput,
  NumberInput,
  Pagination,
  ReferenceArrayInput,
  ReferenceInput,
  ReferenceManyField,
  required,
  SelectArrayInput,
  SelectInput,
  TabbedForm,
  TextField,
  TextInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLLECTION_CATEGORY, COLLECTION_TAG } from '../utils';
import { JsonField, JsonInput } from 'react-admin-json-view';
import { CustomImageInput } from '../components/inputs';
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
  }
});

const ResourceEdit: FC<EditProps> = props => {
  const classes = useStyles();
  return (
    <Edit {...props} mutationMode={"pessimistic"}>
      <TabbedForm  redirect="show"  toolbar={<CustomToolbar saveable/>}>
        <FormTab
          label="resources.apps.tabs.details"
          contentClassName={classes.tab}
        >
          <TextField label="id" source="id" />
          <TextInput source="name" />
          <TextInput source="name_with_slug" />
          <BooleanInput source="featured" />
          <BooleanInput source="publish_ready" />
          <TextInput source="made_country" />
          <NumberInput source="category_id" />
          <TextInput source="gender" />
          <JsonInput
            source="main_image"
            // addLabel={true}
            jsonString={true}
            />
          <TextInput source="description" />
          <NumberInput source="code" />
          <NumberInput source="position" />
          <JsonInput
            source="color_variations_sorter"
            // addLabel={true}
            jsonString={true}
            />
          <TextInput source="product_properties" />
          <JsonInput
            source="seo"
            // addLabel={true}
            jsonString={true}
            />
          <TextInput source="version_name" />
          <TextInput source="version_priority" />
          <NumberInput source="price" />
          <NumberInput source="scheduled_event_id" />
          <DateInput source="scheduled_end_at" />
          <DateInput source="updated_at" />
          <DateInput source="updated_at" />
          <DateField source="created_at" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const requiredValidate = [required()];

export default ResourceEdit;
