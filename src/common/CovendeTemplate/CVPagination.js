import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, styled } from '@material-ui/core/styles';

const mystyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1% 0'
};

const CVPagination = ({ setPage, page, pageNumber, size, marginTop }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 250);
  };

  return (
    <>
      <div style={{ ...mystyle, marginTop }}>
        <Pagination
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
          page={page}
          onChange={(_, value) => handleChange(value)}
          count={pageNumber}
          size={size}
          color='primary'
          shape='rounded'
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
};

export default CVPagination;
