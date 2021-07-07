import React, { FC, AnchorHTMLAttributes, memo } from 'react';
import get from 'lodash/get';
import { Typography } from '@material-ui/core';
import { sanitizeFieldRestProps, UrlFieldProps } from 'react-admin';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from 'ra-ui-materialui/lib/field/types';
import { Link } from 'react-router-dom';

export interface LinkFieldProps extends UrlFieldProps {
  reference: string
}

export const LinkField: FC<LinkFieldProps> = memo<LinkFieldProps>(
    ({ className, emptyText, source = '', record = {}, reference, ...rest }) => {
        const value = get(record, source);
        const onClick = (event: any) => {
            // event.preventDefault();
            event.stopPropagation();
        }
        if (value == null && emptyText) {
            return (
                <Typography
                    component="span"
                    variant="body2"
                    className={className}
                    {...sanitizeFieldRestProps(rest)}
                >
                    {emptyText}
                </Typography>
            );
        }

        return (
            <Link
                className={className}
                to={`/${reference}/${value}/show`}
                onClick={onClick}
                {...sanitizeFieldRestProps(rest)}
            >
                {value}
            </Link>
        );
    }
);

LinkField.defaultProps = {
    addLabel: true,
};

LinkField.propTypes = fieldPropTypes;
LinkField.displayName = 'LinkField';
