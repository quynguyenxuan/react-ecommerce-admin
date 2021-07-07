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
      <TabbedForm  redirect="show"  toolbar={<CustomToolbar />}>
        <FormTab
          label="resources.apps.tabs.details"
          contentClassName={classes.tab}
        >
          <TextField source="id" />
        
          
          <TextField source="title" />
          <ImageField source="image" />
          <RichTextField source="shortDescription" />
          <RichTextField source="description" />
        
          {/* <CustomArrayField source="categoryIds" fullWidth reference={COLLECTION_CATEGORY}/>
          <CustomArrayField source="tagIds" fullWidth reference={COLLECTION_TAG}/> */}
          {/* <TextField
            source="categoryIds"
            formClassName={classes.dInlineBlock}
          />
          <TextField source="tagIds" formClassName={classes.dInlineBlock} /> */}
          <NumberField source="priority" />
          <TextField
            source="iosBundleId"
            formClassName={classes.dInlineBlock}
          />
          <TextField
            source="androidApplicationId"
            formClassName={classes.dInlineBlock}
          />
          <JsonField
            source="metadata"
            addLabel={true}
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
          <ImageField source="metadata.icon" />
          <DateField source="createdAt" formClassName={classes.dInlineBlock} />
          <DateField source="updatedAt" formClassName={classes.dInlineBlock} />
          
        </FormTab>
      </TabbedForm>
    </Show>
  );
};

export default ResourceShow;
