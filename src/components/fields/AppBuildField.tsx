import * as React from 'react';
import { Link } from "react-router-dom";

export const AppBuildField = (props: any) => {
  const { record, basePath } = props;
  console.log('AppBuildField:', props);
  if (!record) return null;
  return (
    <Link to={`${basePath}/${record.id}/show`}>
      <a>{record.number}</a>
    </Link>
  );
};