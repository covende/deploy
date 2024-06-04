import { gql } from 'graphql-request';

export const IWithPagination = (query) => gql`
    totalDocs
    offset
    limit
    totalPages
    page
    pagingCounter
    hasPrevPage
    hasNextPage
    prevPage
    nextPage
    docs${query}`;

export const ICustomerBasic = `{
    user_id
    customer_id
    first_name
    last_name
    image
  }`;
