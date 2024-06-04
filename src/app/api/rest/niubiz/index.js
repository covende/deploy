import axios from 'axios';

// import {AxiosHttpClient} from '@/app/infrastructure/http';
import * as Niubiz from '@/app/configs/niubizConfig';

export default {
  getSecurity: () =>
    // let data = {
    //   url: Niubiz.sandbox.security,
    //   method: 'GET',
    //   data: JSON.stringify(Niubiz.user),
    //   headers: {headers: {Authorization: `Basic ${Niubiz.token}`}},
    // };
    // return AxiosHttpClient.request(data)
    axios.get(
      Niubiz.sandbox.security,
      { headers: { Authorization: `Basic ${Niubiz.token}` } },
      JSON.stringify(Niubiz.user)
    ),
  postEcommerce: (accessToken, body) =>
    axios.post(
      `${Niubiz.sandbox.ecommerce}/${Niubiz.user.merchantidtest}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      }
    ),
  postAutorization: (accessToken, body) => {
    axios.post(
      `${Niubiz.sandbox.authorization}/${Niubiz.user.merchantidtest}`,
      body,
      {
        headers: {
          Authorization: accessToken
        }
      }
    );
  }
};
