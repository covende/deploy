import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_NEWS_LETTER, NEWS_LETTERS } from './NLTypes';

export const news_letters = async ({
  page = 1,
  itemsPage = 10,
  search = ''
}) => {
  const { newsletters } = await AxiosGQL(NEWS_LETTERS(page, itemsPage, search));
  return newsletters.newsletters || [];
};
export const add_news_letter = async (email) => {
  const { addNewsletter } = await AxiosGQL(ADD_NEWS_LETTER(email));
  return addNewsletter || null;
};
