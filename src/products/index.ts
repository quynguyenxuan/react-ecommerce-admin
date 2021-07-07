import InvoiceIcon from '@material-ui/icons/LibraryBooks';
import ResourceCreate from './ResourceCreate';
import ResourceEdit from './ResourceEdit';
import ResourceList from './ResourceList';
import ResourceShow from './ResourceShow';

export default (permissions: any) => {
  console.log('app permissions: ', permissions);
  return {
    list: ResourceList,
    show: ResourceShow,
    create: ResourceCreate,
    edit: ResourceEdit,
    icon: InvoiceIcon,
  };
};
