import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { UPLOAD_FILE, UPLOAD_FILE_PRODUCT } from './uploadtypes';

export const uploadFile = async (upload, product = false) => {
  try {
    const res = await AxiosGqlClient.mutation(
      product ? UPLOAD_FILE_PRODUCT : UPLOAD_FILE,
      { ...upload }
    );
    return res.data.uploadFile;
  } catch (error) {
    return {
      status: 'error'
    };
  }
};
