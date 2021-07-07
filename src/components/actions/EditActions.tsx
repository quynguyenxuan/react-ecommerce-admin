import * as React from 'react';
import PropTypes from 'prop-types';

import { Record, useEditContext, useResourceDefinition } from 'ra-core';
import { ShowButton, TopToolbar } from 'ra-ui-materialui';

const EditActions = ({ className, ...rest }: EditActionsProps) => {
    const { basePath, record } = useEditContext(rest);
    const { hasShow } = useResourceDefinition(rest);

    return (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
            {hasShow && <ShowButton basePath={basePath} record={record} />}
        </TopToolbar>
    );
};

const sanitizeRestProps = ({
    basePath = null,
    hasCreate = null,
    hasEdit = null,
    hasShow = null,
    hasList = null,
    ...rest
}: any) => rest;

export interface EditActionsProps {
    basePath?: string;
    className?: string;
    data?: Record;
    hasShow?: boolean;
    hasList?: boolean;
    resource?: string;
}

EditActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasShow: PropTypes.bool,
    resource: PropTypes.string,
};

export default EditActions;
