import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { ImageFieldProps, sanitizeFieldRestProps } from 'react-admin';
import { fieldPropTypes } from 'ra-ui-materialui/lib/field/types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export interface CustomImageFieldProps extends ImageFieldProps {
    choiceSource?: string
  }

const useStyles = makeStyles(
    {
        list: {
            display: 'flex',
            listStyleType: 'none',
            width: '100%',
            paddingInlineStart: 0,
            flexWrap: 'wrap',
        },
        image: {
            maxHeight: '8rem',
            
            maxWidth: '8rem',
            width: 'auto',
            borderRadius: 0,
            border: '1px solid gray',
        },
        imageBox: {
            margin: '0.5rem',
            position: 'relative',
        },
        checkedIcon: {
            height: 22,
            width: 22,
            color: '#6ff51e',
            position: 'absolute',
            top: 3,
            right: 3,
        }

    },
    { name: 'RaImageField' }
);

export const CustomImageField: FC<CustomImageFieldProps> = props => {
    const {
        className,
        classes: classesOverride,
        emptyText = 'No image found',
        record,
        source = '',
        src = '',
        title = '',
        choiceSource,
        ...rest
    } = props;
    const sourceValue = get(record, source);
    const choiceSourceValue = choiceSource ? get(record, choiceSource) : [] 
    const classes = useStyles(props);
    if (!sourceValue) {
        return emptyText ? (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText}
            </Typography>
        ) : (
            <div className={className} {...sanitizeFieldRestProps(rest)} />
        );
    }

    if (Array.isArray(sourceValue)) {
        return (
            <ul
                className={classnames(classes.list, className)}
                {...sanitizeFieldRestProps(rest)}
            >
                {sourceValue.map((file, index) => {
                    const fileTitleValue = get(file, title) || title;
                    const srcValue = src && get(file, src) || file || title;

                    return (
                        <li key={index} className={classes.imageBox}>
                            <img
                                alt={fileTitleValue || `image ${index}`}
                                title={fileTitleValue}
                                src={srcValue}
                                className={classes.image}
                            />
                            {choiceSourceValue.includes(index) && <CheckCircleIcon className={classes.checkedIcon}/>}
                </li>
                    );
                })}
            </ul>
        );
    }

    const titleValue = get(record, title) || title;

    return (
        <div className={className} {...sanitizeFieldRestProps(rest)}>
            <img
                title={titleValue}
                alt={titleValue}
                src={sourceValue}
                className={classes.image}
            />
        </div>
    );
};

// wat? TypeScript looses the displayName if we don't set it explicitly
CustomImageField.displayName = 'ImageField';

CustomImageField.defaultProps = {
    addLabel: true,
};

CustomImageField.propTypes = {
    ...fieldPropTypes,
    src: PropTypes.string,
    title: PropTypes.string,
};

