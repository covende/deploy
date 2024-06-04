import { LocalStorageAdapter } from '@/app/infrastructure/cache';

import 'jest-localstorage-mock';
import faker from 'faker';

const makeSut = () => LocalStorageAdapter;

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Debería llamar a localStorage.setItem con valores correctos', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement();

    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('Debería llamar a localStorage.removeItem si el valor es nulo', async () => {
    const sut = makeSut();
    const key = faker.database.column();

    sut.set(key, undefined);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Debería llamar a localStorage.getItem con el valor correcto', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
