import * as React from 'react';
import { FC } from 'react';
import {
  BooleanInput,
  Create,
  CreateProps,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EditProps,
  FileInput,
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
import { makeStyles } from '@material-ui/core/styles';
import { COLLECTION_CATEGORY, COLLECTION_TAG } from '../utils';
import { JsonInput } from 'react-admin-json-view';
import { CustomImageInput } from '../components/inputs';
import { CustomToolbar } from '../components/toolbars';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};
const useStyles = makeStyles(styles);

const ResourceCreate: FC<CreateProps> = props => {
  const classes = useStyles();
  return (
    <Create {...props}>
      <TabbedForm  redirect="show" toolbar={<CustomToolbar saveable alwaysEnableSaveButton={true}/>}>
        <FormTab label="resources.apps.tabs.details">
        <TextInput label="id" source="id" />
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
          <DateInput source="created_at" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
const requiredValidate = [required()];

export default ResourceCreate;
