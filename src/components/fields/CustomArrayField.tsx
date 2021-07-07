import React, { FC, AnchorHTMLAttributes, memo } from 'react';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { Chip, Typography } from '@material-ui/core';
import { ArrayFieldProps, sanitizeFieldRestProps, TextFieldProps, UrlFieldProps } from 'react-admin';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from 'ra-ui-materialui/lib/field/types';
import { Link } from 'react-router-dom';

export interface CustomArrayFieldProps extends TextFieldProps {
    reference?: string
}

export const CustomArrayField: FC<CustomArrayFieldProps> = memo<CustomArrayFieldProps>(
    ({ className, source = '', record = {}, emptyText, reference, ...rest }) => {
        const value = get(record, source);
        const onClick = (event: any) => {
            // event.preventDefault();
            event.stopPropagation();
        }
        if(!value){
            return (
                <Typography
                    component="span"
                    variant="body2"
                    className={className}
                    {...sanitizeFieldRestProps(rest)}
                > {emptyText || ''}
                </Typography>
            );
        }
        if(reference){
            return value.map((item: any, index: number) => (
                <Chip
                    component={Link}
                    style={{marginRight: 5, marginBottom: 5}}
                    to={`/${reference}/${item}/show`}
                    label={item}
                    onClick={onClick}
                    {...sanitizeFieldRestProps(rest)}
                    />
            ));
        }
        return value.map((item: any, index: number) => (
            <Chip
                label={item}
                style={{marginRight: 5, marginBottom: 5}}
                onClick={onClick}
                {...sanitizeFieldRestProps(rest)}
                />
        ));
    }
);

// what? TypeScript looses the displayName if we don't set it explicitly
CustomArrayField.displayName = 'CustomArrayField';

CustomArrayField.defaultProps = {
    addLabel: true,
};

CustomArrayField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
};

