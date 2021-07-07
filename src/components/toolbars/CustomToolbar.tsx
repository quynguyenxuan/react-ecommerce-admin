import React, { FC, AnchorHTMLAttributes, memo, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteButton, SaveButton, ToolbarProps } from 'ra-ui-materialui';

export const CustomToolbar: FC<ToolbarProps & {saveable?: boolean, editable?: boolean}> = (props: any) => {
  const {
    alwaysEnableSaveButton,
    basePath,
    children,
    className,
    classes: classesOverride,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
    mutationMode,
    width,
    disabled,
    saveable, 
    editable,
    ...rest
} = props;
  const classes = useStyles();
  const mainContent = document.getElementById('main-content') as HTMLElement;
  console.log('Content: ', mainContent);
  
  if(!editable && !saveable) return null;
  return (
    // <HideOnScroll>
    ReactDOM.createPortal(
      (
        <Toolbar {...props} className={classes.toolbar}>
          {saveable && 
          <SaveButton 
            handleSubmitWithRedirect={
              handleSubmitWithRedirect || handleSubmit
            }
            disabled={disabled}
            invalid={invalid}
            redirect={redirect}
            saving={saving}
            submitOnEnter={submitOnEnter}
          />
          }
          {editable && 
          <DeleteButton 
            basePath={basePath}
            record={record}
            resource={resource}
            undoable={undoable}
            mutationMode={mutationMode} />
          }
          {React.Children.map(props.children, (child => React.cloneElement(child, {
            basePath,
            record,
            resource,
          })))}
        </Toolbar>),
      mainContent
    )
    );
};

const useStyles = makeStyles({
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#3c4d6414',
      position: 'absolute',
      minHeight: 45,
      bottom: 0,
      left: 0,
      right: 0,
  },
});