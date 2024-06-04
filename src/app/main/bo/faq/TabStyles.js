import themeCovende from '@/themeCovende';
import styled from '@emotion/styled';

export const TabStyles = styled.div`
  & .chakra-tabs__tab {
    padding: 0px;
    margin-top: 0.5rem;
  }
  & button.chakra-tabs__tab > div {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    border-radius: 10px 10px 0px 0px;
    background-color: #d4d4d4;
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: #4f4f4f;
  }
  & button[tabindex='0'] {
    border-radius: 10px 10px 0px 0px;
    padding-top: 0.5rem;
    margin-top: 0rem;
    background-color: ${themeCovende.colors.gris};
  }

  & button[tabindex='0'] > div {
    color: ${themeCovende.colors.celeste};
    background-color: white;
    border-radius: 10px 10px 0px 0px;
  }
  & .MuiTypography-root {
    color: #fff;
  }
`;
