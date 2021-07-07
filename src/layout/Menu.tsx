import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  usePermissions,
} from 'react-admin';
import InvoiceIcon from '@material-ui/icons/LibraryBooks';

import { AppState } from '../types';
import {
  COLLECTION_APP,
  COLLECTION_APP_BINARY,
  COLLECTION_APP_BUILD,
  COLLECTION_APP_LINK,
  COLLECTION_APP_PROVIDER,
  COLLECTION_APP_RESOURCE,
  COLLECTION_APP_SCREENSHOT,
  COLLECTION_APP_VERSION,
  COLLECTION_CATEGORY,
  COLLECTION_COLLECTION,
  COLLECTION_LINK,
  COLLECTION_PRODUCT,
  COLLECTION_TAG,
} from '../utils';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  useSelector((state: AppState) => state.theme); // force rerender on theme change
  const { permissions } = usePermissions();
  const handleToggle = (menu: MenuName) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };
  const isAdmin = permissions && (permissions.admin || permissions.moderator);

  return (
    <Box mt={1}>
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      <MenuItemLink
        to={`/${COLLECTION_PRODUCT}`}
        primaryText={translate(`resources.products.name`, {
          smart_count: 2,
        })}
        leftIcon={<InvoiceIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {isXSmall && (
        <MenuItemLink
          to="/configuration"
          primaryText={translate('pos.configuration')}
          leftIcon={<SettingsIcon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      )}
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;
