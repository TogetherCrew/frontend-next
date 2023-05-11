import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import getUrlParams from '../helper/routeHelper';
import useStatusCodeService from '../services/StatusCodeService';
import { CallbackUrlParams, UrlParams } from '../utils/interfaces';

function Callback() {
  const location = useLocation();
  const params: UrlParams = getUrlParams(location);
  const { handleStatusCode } = useStatusCodeService();

  useEffect(() => {
    handleStatusCode(params as unknown as CallbackUrlParams);
  }, [params, handleStatusCode]);

  return <div>Loading...</div>;
}

export default Callback;
