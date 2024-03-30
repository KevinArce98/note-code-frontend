import React from 'react';
import { LoadingContext } from '../context';

export const useLoadingContext = () => {
  const context = React.useContext(LoadingContext);
  return context;
};
