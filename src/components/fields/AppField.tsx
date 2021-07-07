import * as React from 'react';
import { Link } from "react-router-dom";

export const AppField = (props: any) => {
  const { record, basePath } = props;
  console.log('AppField:', props);
  if (!record) return null;
  return (
    <Link to={`${basePath}/${record.id}/show`}>
      <a>{record.name}</a>
    </Link>
  );
};