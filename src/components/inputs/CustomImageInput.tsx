import React, {
  useCallback,
  FunctionComponent,
  useMemo,
  useState,
  Children,
  ReactElement,
} from 'react';
import { ImageField, ImageInput } from 'ra-ui-materialui';
import { useInput } from 'ra-core';
import * as FileAPI from '../../authProvider/fileApi';
import { CustomImageField, LinkField } from '../fields';

export const CustomImageInput = (props: any) => {
  const { dirPath, source, validate, multiple, ...rest } = props;
  const { id, input, meta, isRequired } = useInput(props);
  const value = input.value;
  // console.log('CustomImageInput props: ', props, value);
  const fileValue = value ? (Array.isArray(value) ? value : [value]) : [];
  // console.log('CustomImageInput props1: ', fileValue);
  const [files, setFiles] = useState(fileValue);
  const onDrop = async (acceptedFiles: any, rejectedFiles: any, event: any) => { //useCallback(
    const updatedFiles = [...files];
    console.log('CustomImageInput', acceptedFiles, event);
    for (const file of acceptedFiles) {
      const result = await FileAPI.upload(dirPath, file);
      if (result.json?.data) {
        if (multiple) {
          updatedFiles.push(result.json?.data);
          input.onChange(updatedFiles);
        } else {
          updatedFiles[0] = result.json?.data;
          input.onChange(updatedFiles[0]);
        }
        setFiles(updatedFiles);
      }
      console.log('Upload File: ', result.json.data, input.value, props.record);
    }
  };

  const onChanged = (value: any) => {
    console.log('OnChange: ', value);
  };

  return (
    <>
      <ImageInput
        {...props}
        options={{ onDrop: onDrop }}
        // format={transformFiles}
        // parse={transformFiles}
        // onChange={onChanged}
      >
        <ImageField source="image" />
      </ImageInput>
      <div style={{}}>
        {files?.map((item: any, index: number) => (
          <img
            src={item}
            key={index}
            style={{
              maxHeight: 142,
              marginRight: 10,
              width: 'auto',
              marginBottom: 10,
              border: '1px solid #ccc6c685',
              borderRadius: 5,
            }}
          />
        ))}
      </div>
    </>
  );
};

const emptyArray: never[] = [];
