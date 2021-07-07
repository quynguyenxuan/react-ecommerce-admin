import * as React from 'react';
import { FC } from 'react';
import {
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
          <TextInput source="title" fullWidth validate={requiredValidate} />
          <CustomImageInput source="image" dirPath="images"/>
          <RichTextInput source="shortDescription" fullWidth/>
          <RichTextInput
            source="description"
            label="Description"
            validate={requiredValidate}
          />
          
          <ReferenceArrayInput
            source="categoryIds"
            reference={COLLECTION_CATEGORY}
          >
            <SelectArrayInput optionText="title" />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="tagIds" reference={COLLECTION_TAG}>
            <SelectArrayInput optionText="title" />
          </ReferenceArrayInput>
          <NumberInput source="priority" />
          <TextInput source="iosBundleId" />
          <TextInput source="androidApplicationId" />

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
          {/* <CustomImageInput source="metadata.icon" dirPath="icons"/> */}
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const requiredValidate = [required()];

export default ResourceEdit;
