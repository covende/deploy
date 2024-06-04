import styled from '@emotion/styled';

import themeCovende from '@/themeCovende';

export const FooterSections = styled.div`
  padding: 50px 80px;
  background-color: white;
  ${themeCovende.mq.min.xs} {
    padding: 48px 0px;
  }
`;

export const SeccionTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px;
  justify-content: space-evenly;

  ${themeCovende.mq.min.xxs} {
    padding: 0px 20px;
    grid-template-columns: auto;
  }
  ${themeCovende.mq.min.xs} {
    grid-template-columns: auto;
  }
  ${themeCovende.mq.min.sm} {
    grid-template-columns: auto auto;
  }
  ${themeCovende.mq.min.md} {
    grid-template-columns: auto auto auto auto;
  }
  ${themeCovende.mq.min.xl} {
    grid-template-columns: auto auto auto auto auto;
  }
`;
