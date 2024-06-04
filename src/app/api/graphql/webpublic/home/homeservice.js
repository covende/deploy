import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { HOME_SERVICE } from './LoadService';

const homeservice = async () => {
  let status = localStorage.getItem('load');
  const result = status == 'uno' ? await AxiosGQL(HOME_SERVICE) : null;
  localStorage.setItem('load', 'cero');
  return {
    data: result,
    code: result != null ? 200 : 500,
    error: result == null
  };
};

export default homeservice;
