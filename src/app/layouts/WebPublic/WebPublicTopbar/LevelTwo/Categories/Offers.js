import React from 'react';
import styled from '@emotion/styled';

const OffersBanner = styled.span`
  background: #00adf6;
  width: 130px;
  height: 130px;
`;

const OffersContainer = styled.span`
  width: 130px;
  height: 130px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: auto auto;
  text-align: center;
`;

function Offers(props) {
  const { data } = props;

  return (
    <OffersContainer>
      {data && data.length ? (
        data.map((offer, index) => (
          <OffersBanner id={`offer-${index}`} key={`offer-${index}`}>
            {offer.type}
            <br />
            {offer.rows}x{offer.cols}
          </OffersBanner>
        ))
      ) : (
        <span>Ninguna subcategoría...</span>
      )}
    </OffersContainer>
  );
}

export default Offers;
