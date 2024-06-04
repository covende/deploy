import axios from 'axios';
import faker from 'faker';

export const mockHttpResponse = () => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
});

export const mockAxios = () => {
  const mockedAxios = axios;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};

export const mockHttpRequest = () => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
});
