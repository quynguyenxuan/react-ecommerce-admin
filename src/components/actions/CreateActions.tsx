import * as React from 'react';
import PropTypes from 'prop-types';

import { useCreateContext, useResourceDefinition } from 'ra-core';
import { ListButton, SaveButton, TopToolbar } from 'ra-ui-materialui';

const sanitizeRestProps = ({
    basePath,
    className,
    hasList,
    resource,
    redirect,
    ...rest
}: any) => rest;

const CreateActions = ({ className, saveable, redirect, ...rest }: any) => {
    const { basePath } = useCreateContext(rest);
    const { hasList } = useResourceDefinition(rest);
    return (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
          {saveable && 
            <SaveButton 
              disabled={false}
              redirect={"show"}
              submitOnEnter={false}
            />
            }
            {hasList && <ListButton basePath={basePath} size="medium"/>}
        </TopToolbar>
    );
};

CreateActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool,
    saveable:PropTypes.bool,
    redirect:PropTypes.string,
};

export default CreateActions;
