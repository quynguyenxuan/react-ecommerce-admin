import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  Datagrid,
  DateField,
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
          {/* <NumberInput source="id" /> */}
          <TextInput source="title" fullWidth validate={requiredValidate} />
          {/* <CustomImageInput source="image" dirPath="images" /> */}
          <RichTextInput source="shortDescription" fullWidth/>
          <RichTextInput
            source="description"
            label="Description"
            validate={requiredValidate}
          />
          <NumberInput source="priority" />
          <TextInput source="iosBundleId" />
          <TextInput source="androidApplicationId" />
          <FileInput source="image"/>
          <JsonInput
            source="metadata"
            // addLabel={true}
            jsonString={false} // Set to true if the value is a string, default: false
            reactJsonOptions={{
              // Props passed to react-json-view
              src: {},
              name: null,
              collapsed: true,
              enableClipboard: false,
              displayDataTypes: true,
            }}
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
const requiredValidate = [required()];

export default ResourceCreate;
