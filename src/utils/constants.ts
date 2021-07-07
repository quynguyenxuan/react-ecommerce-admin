export const COLLECTION_APP = 'apps';
export const COLLECTION_APP_BUILD = 'app/builds';
export const COLLECTION_APP_VERSION = 'app/versions';
export const COLLECTION_APP_BINARY = 'app/binaries';
export const COLLECTION_APP_SCREENSHOT = 'app/screenshots';
export const COLLECTION_APP_RESOURCE = 'app/resources';
export const COLLECTION_APP_PROVIDER = 'app/providers';
export const COLLECTION_APP_PLUGIN = 'app/plugins';
export const COLLECTION_APP_LINK = 'app/links';
export const COLLECTION_TAG = 'tags';
export const COLLECTION_CATEGORY = 'categories';
export const COLLECTION_COLLECTION = 'collections';
export const COLLECTION_USER = 'users';
export const COLLECTION_LINK = 'links';
export const COLLECTION_PRODUCT = 'products';
export const COLLECTION_PRODUCT_COLLECTION = 'product_collections';
export const COLLECTION_CATEGORY_COLLECTION = 'category_collections';

export const TOKEN_KEY = '__JWT_TOKEN__'
export const AUTH_KEY = 'userInfo'

export const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '');

export enum BINARY_STATUS {
  pending = 'pending',
  processing = 'processing',
  succeed = 'succeed',
  failed = 'failed',
  published = 'published',
  skipped = 'skipped'

}

export const BINARY_STATUS_OPTIONS = Object.entries(BINARY_STATUS).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum SCREENSHOT_STATUS {
  none = 'none',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export const SCREENSHOT_STATUS_OPTIONS = Object.entries(SCREENSHOT_STATUS).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum DEVICE_DISPLAY {
  iphone_55 = 'iphone_55',
  iphone_65 = 'iphone_65',
  ipad_pro = 'ipad_pro',
  custom = 'custom'
}

export const DEVICE_DISPLAY_OPTIONS = Object.entries(DEVICE_DISPLAY).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum RESOURCE_STATUS {
  pending = 'pending',
  publishable = 'publishable',
  preparing = 'preparing',
  done = 'done',
  skipped = 'skipped'
}

export const RESOURCE_STATUS_OPTIONS = Object.entries(RESOURCE_STATUS).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum AGENT_NAMES {
  firebase_agent = 'firebase_agent',
  admob_agent = 'admob_agent',
  app_store_agent = 'app_store_agent',
  google_play_agent ='google_play_agent',
  amazon_store_agent = 'amazon_store_agent',
  samsung_galaxy_store_agent = 'samsung_galaxy_store_agent',
  huawei_app_gallery_agent = 'huawei_app_gallery_agent',
  convert_portal_agent = 'convert_portal_agent',
}

export const AGENTS_OPTIONS = Object.entries(AGENT_NAMES).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum JOB_NAMES {
  add_app = 'add_app',
  release_app = 'release_app',
  update_app = 'update_app',
}

export const JOB_NAMES_OPTIONS = Object.entries(JOB_NAMES).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum LINK_TYPES {
  none = 'none',
  rewrite = 'rewrite',
  redirect = 'redirect',
  whitelist = 'whitelist',
  blacklist = 'blacklist'
}

export const LINK_TYPE_OPTIONS = Object.entries(LINK_TYPES).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum APP_LINK_STATUS {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'

}

export const APP_LINK_STATUS_OPTIONS = Object.entries(APP_LINK_STATUS).map(([key, value]) => ({
  id: key,
  name: value,
}));

