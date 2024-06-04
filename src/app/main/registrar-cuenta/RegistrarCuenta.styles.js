import styled from '@emotion/styled';

// UI components
import { CardBody } from '@/common/components';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

export const StyledLoginTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  color: white;
  background-color: ${COLORS['blue']};
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
`;

export const StyledRegisterConventional = styled(CardBody)`
  padding: 16px 24px 36px 24px;
  right: 80px;
  display: grid;
  grid-template-rows: max-content auto max-content;
  max-width: 410px;
  min-height: 421px;
  height: 100%;
  font-family: 'Poppins';
  box-sizing: border-box;
  border-radius: 28px;
`;

export const FormRegister = styled.div`
  width: 100%;
  max-width: 450px;
  border-radius: 1rem;
  background-color: #ffffff;
`;

export const RegisterContainer = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
  width: max-content;
`;

export const RegisterRightContainer = styled.div`
  display: grid;
  grid-template-rows: max-content max-content max-content calc(100% - 119px);
  width: 220px;
`;

export const CuentaContainer = styled.div`
  padding: 16px 22px;
  margin-bottom: 8px;
  width: 220px;
  color: #4d4d4d;
  background: #fff;
  font-size: 10px;
  line-height: 15px;
  border-radius: 16px;
  box-sizing: border-box;
`;

export const CuentaTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: ${({ color }) => color || '#4d4d4d'};
`;
export const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ContentPage = styled.div`
  width: 100%;
  height: calc(100vh - 135px);
  padding: 15px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;
