import React, { FC, AnchorHTMLAttributes, memo } from 'react';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { Typography } from '@material-ui/core';
import { sanitizeFieldRestProps, UrlFieldProps } from 'react-admin';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from 'ra-ui-materialui/lib/field/types';

export interface CountFieldProps extends UrlFieldProps {
}

export const CountField: FC<CountFieldProps> = memo<CountFieldProps>(
    ({ className, source = '', record = {}, emptyText, ...rest }) => {
        const value = get(record, source);

        return (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {value != null && isArray(value)
                    ? value.length
                    : emptyText || 0}
            </Typography>
        );
    }
);

// what? TypeScript looses the displayName if we don't set it explicitly
CountField.displayName = 'TextField';

CountField.defaultProps = {
    addLabel: true,
};

CountField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
};

