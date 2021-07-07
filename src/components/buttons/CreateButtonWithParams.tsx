import * as React from 'react';
import { FC, ReactElement, memo } from 'react';
import PropTypes from 'prop-types';
import { Fab, useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentAdd from '@material-ui/icons/Add';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslate } from 'ra-core';
import get from 'lodash/get';
import set from 'lodash/set';
import { Button } from 'react-admin';
import { CreateButtonProps } from 'ra-ui-materialui/lib/button/CreateButton';
import { sanitizeButtonRestProps } from 'ra-ui-materialui/lib/button/Button';
import { stringify } from 'query-string';
export interface CreateButtonWithParamsProps extends CreateButtonProps {
    params?: any,
    // source: string,
    reference: string
}

export const CreateButtonWithParams: FC<CreateButtonWithParamsProps> = props => {
    const {
        basePath = '',
        className,
        classes: classesOverride,
        label = 'ra.action.create',
        icon = defaultIcon,
        variant,
        params = {},
        reference,
        // source = '', 
        record = {},
        ...rest
    } = props;
    console.log('CreateButtonWithParams:', props);
    const classes = useStyles(props);
    const translate = useTranslate();
    const isSmall = false;
    // useMediaQuery((theme: Theme) =>
    //     theme.breakpoints.down('sm')
    // );
    const queryParams = {};
    Object.entries(params).map(([key, path]: any) => set(queryParams, path, get(record, key)));
    return isSmall ? (
        <Fab
            component={Link}
            color="primary"
            className={classnames(classes.floating, className)}
            to={{
                pathname:`/${reference}/create`,
                search: `?source=${JSON.stringify(queryParams)}`,
                // state: { record: queryParams },
            }}
            aria-label={label && translate(label)}
            {...sanitizeButtonRestProps(rest)}
        >
            {icon}
        </Fab>
    ) : (
        <Button
            component={Link}
            to={{
                pathname:`/${reference}/create`,
                search: `?source=${JSON.stringify(queryParams)}`,
                // state: { record: queryParams },
            }}
            className={className}
            label={label}
            variant={variant}
            {...(rest as any)}
        >
            {icon}
        </Button>
    );
};

const defaultIcon = <ContentAdd />;

const useStyles = makeStyles(
    theme => ({
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000,
        },
        floatingLink: {
            color: 'inherit',
        },
    }),
    { name: 'RaCreateButton' }
);

CreateButtonWithParams.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
};

export default memo(CreateButtonWithParams, (prevProps, nextProps) => {
    return (
        prevProps.basePath === nextProps.basePath &&
        prevProps.label === nextProps.label &&
        prevProps.translate === nextProps.translate &&
        prevProps.to === nextProps.to
    );
});
