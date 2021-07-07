import React, { useCallback,FunctionComponent, useMemo } from 'react';
import {
  AutocompleteArrayInput,
  ChoicesInputProps,
  InputProps,
  TextFieldProps,
  useInput,
  useSuggestions,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import { Autocomplete, AutocompleteGetTagProps } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { Avatar, IconButton, TextField } from '@material-ui/core';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import CloseIcon from '@material-ui/icons/Close';
// export interface OptionType extends OptionTypeBase{};
// export interface GroupType extends GroupTypeBase{
//   options: any;
// }
interface Options {
  suggestionsContainerProps?: any;
  labelProps?: any;
  choiceSource?: string;
} 
export type ImageSortableProps = ChoicesInputProps<TextFieldProps & Options> &
  Omit<TextFieldProps, 'label' | 'helperText'>;

function arrayMove(array: any, from: any, to: any) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export const ImageSortable: FunctionComponent<ImageSortableProps> = (props: any) => {
  const {
    label,
    format,
    helperText,
    emptyText,
    emptyValue,
    fullWidth,
    loaded,
    loading,
    limitChoicesToValue,
    matchSuggestion,
    onBlur,
    onFocus,
    onChange,
    options,
    parse,
    resource,
    source,
    validate,
    dataSource,
    record,
    optionText = 'title',
    optionValue = 'title',
    ...rest
  } = props;
  const {
    id,
    input,
    isRequired,
    meta: { error, submitError, touched },
  } = useInput({
    format,
    onBlur,
    onChange,
    onFocus,
    parse,
    resource,
    source,
    type: 'text',
    validate,
    ...rest,
  });
  const classes = useStyles();
  const choices: any[] = get(record, dataSource)?.map(
    (item: any, index: number) => ({
      id: index,
      title: item,
    })
  ) || emptyArray;
  const selectedItems = isArray(input.value) && input.value || emptyArray;
  const selectedValues = selectedItems.map((item: any) => choices.find((i:any) => get(i,optionValue) === item));
  console.log(
    'ImageAutoCompleteSortable',
    selectedItems,
    props,
    choices,
    input,
    input.value,
    get(record, dataSource)
  );
  const onChanged = (event: any, selectedOptions: any) => {
    console.log('OnChanged: ', selectedOptions);
    const newSelectedItems = selectedOptions.map((item: any) => get(item, optionValue));
    input.onChange(newSelectedItems);
  };

  const onDelete = (seleted: any) => {
    const newSelectedItems = selectedItems.filter(item => item !== get(seleted, optionValue));
    input.onChange(newSelectedItems);
    console.log('onDelete2: ', seleted, newSelectedItems);
  }
  // const getOptionSelected = (option: any, value: any) => {
  //   console.log('getOptionSelected', option, value,selectedItems)
  //   return !!selectedItems.find(item => item.id === value.id);
  // };

  const onSortEnd = (props: any) => {
    console.log('Values sorted:', props);
    const { oldIndex, newIndex } = props;
    const newSelectedItems = [...selectedItems];
    const newValue = arrayMove(newSelectedItems, oldIndex, newIndex);
    input.onChange(newValue);
    console.log('Values sorted:', newValue);
  };

  const SortableItem = SortableElement(({ value }: any) => (
    <ChipItem value={value} onDelete={onDelete} />
  ));

  const SortableList = SortableContainer(({ items, getTagProps }: any) => {
    return (
      <div style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {items.map((value: any, index: number) => (
          <SortableItem
            key={index}
            index={index}
            value={value}
            getTagProps={getTagProps}
          />
        ))}
      </div>
    );
  });

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      value={selectedValues}
      // getOptionSelected={getOptionSelected}
      onChange={onChanged}
      options={choices}
      getOptionLabel={(option: any) => option?.title || ''}
      defaultValue={[]}
      renderTags={
        (value: any[], getTagProps: AutocompleteGetTagProps) => (
          <SortableList
            items={value}
            getTagProps={getTagProps}
            onSortEnd={onSortEnd}
            axis="xy"
            distance={10}
          />
        )
      }
      renderInput={params => (
        <TextField
          {...params}
          // variant="standard"
          label={label}
          placeholder={helperText}
        />
      )}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Avatar src={option.title} />
          <div className={classes.text}>
            {option.title}
          </div>
        </React.Fragment>
      )}
    />
  );
};

const ChipItem = (props: any) => {
  const { className, onDelete, value } = props;
  const classes = useChipStyles();
  if(!value) return null;
  
  const handleDelete = () => onDelete && onDelete(value);
  return (
    <div className={classes.chipContainer}>
      <img
        alt={`image ${value.id}`}
        title={value.title}
        src={value.title}
        className={classes.chipImage}
      />
      <IconButton onClick={handleDelete} className={classes.chipDelete}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

const emptyArray: never[] = [];

const useStyles = makeStyles(
  theme => {
    const chipBackgroundColor =
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.09)'
        : 'rgba(255, 255, 255, 0.09)';

    return {
      container: {
        flexGrow: 1,
        position: 'relative',
      },
      suggestionsContainer: {},
      chip: {
        margin: theme.spacing(0.5, 0.5, 0.5, 0),
      },
      chipContainerFilled: {
        margin: '27px 12px 10px 0',
      },
      chipContainerOutlined: {
        margin: '12px 12px 10px 0',
      },
      inputRoot: {
        flexWrap: 'wrap',
      },
      inputRootFilled: {
        flexWrap: 'wrap',
        '& $chip': {
          backgroundColor: chipBackgroundColor,
        },
      },
      inputInput: {
        width: 'auto',
        flexGrow: 1,
      },
      chipContainer: {
        height: 80,
        width: 'auto',
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
        // display: 'inline-flex',
        // borderRadius: 5,
        border: '1px solid gray',
      },
      chipDelete: {
        height: 22,
        width: 22,
        color: '#e2e0e0',
        backgroundColor: '#aba8a8',
        position: 'absolute',
        top: 3,
        right: 3,
      },
      chipImage: {
        height: 142,
        width: 'auto',
        // marginRight: 10,
      },
      color: {
        width: 14,
        height: 14,
        flexShrink: 0,
        borderRadius: 3,
        marginRight: 8,
        marginTop: 2,
      },
      text: {
        flexGrow: 1,
        marginLeft: 10,
      },
      close: {
        opacity: 0.6,
        width: 18,
        height: 18,
      },
    };
  },
  { name: 'RaAutocompleteArrayInput' }
);
const useChipStyles = makeStyles(
  theme => {
    const chipBackgroundColor =
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.09)'
        : 'rgba(255, 255, 255, 0.09)';

    return {
      
      chipContainer: {
        height:142,
        width: 'auto',
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
        // display: 'inline-flex',
        // borderRadius: 5,
        border: '1px solid gray',
      },
      chipDelete: {
        height: 22,
        width: 22,
        color: '#e2e0e0',
        backgroundColor: '#aba8a8',
        position: 'absolute',
        top: 3,
        right: 3,
      },
      chipImage: {
        height: 142,
        width: 'auto',
        // marginRight: 10,
      },
      color: {
        width: 14,
        height: 14,
        flexShrink: 0,
        borderRadius: 3,
        marginRight: 8,
        marginTop: 2,
      },
      text: {
        flexGrow: 1,
        marginLeft: 10,
      },
      close: {
        opacity: 0.6,
        width: 18,
        height: 18,
      },
    };
  },
  { name: 'RaAutocompleteArrayInput' }
);
