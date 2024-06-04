import React from 'react';
import { Menu, Box } from '@chakra-ui/react';
import { CVBadge, CVButton, CVColumn } from '@/common/CovendeTemplate';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { GiCardboardBox } from 'react-icons/gi';
import { CVValidLogin } from '@/common/CovendeTemplate/CVMethods';

function NavOrders({ auth }) {
  const { BuyerSeller } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const redirection = () => {
    const url = '/pedidos';
    if (auth.user != null || BuyerSeller.user != null) {
      const newUri = auth.menu.length == 2 ? `/seller${url}` : `/buyer${url}`;
      history.push(newUri);
    } else {
      CVValidLogin(dispatch, url);
    }
  };

  return (
    <Menu>
      <Box cursor='pointer' onClick={() => redirection()} height='100%'>
        <CVBadge
          content={0}
          text='Mis Pedidos'
          icon={
            <svg
              width='40'
              height='29'
              viewBox='0 0 87 81'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.17148 13.2804C1.90766 12.7432 2.85616 12.59 3.72407 12.868L44.1205 25.8077C45.302 26.1861 46.1036 27.2846 46.1036 28.5252V78.1465C46.1036 79.0481 45.6775 79.8966 44.9544 80.4351C44.2313 80.9736 43.2963 81.1387 42.4325 80.8805L2.03613 68.802C0.827844 68.4408 0 67.3292 0 66.068V15.5855C0 14.6742 0.435302 13.8177 1.17148 13.2804ZM5.70717 19.496V63.9429L40.3964 74.3149V30.6076L5.70717 19.496Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M85.3276 13.2804C86.0638 13.8177 86.4991 14.6742 86.4991 15.5855V66.068C86.4991 67.3292 85.6712 68.4408 84.4629 68.802L44.0666 80.8805C43.2028 81.1387 42.2677 80.9736 41.5446 80.4351C40.8216 79.8966 40.3955 79.0481 40.3955 78.1465V28.5252C40.3955 27.2846 41.1971 26.1861 42.3786 25.8077L82.775 12.868C83.6429 12.59 84.5914 12.7432 85.3276 13.2804ZM46.1027 30.6076V74.3149L80.7919 63.9429V19.496L46.1027 30.6076Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M42.3922 0.131981C42.9505 -0.0439936 43.5494 -0.0439936 44.1078 0.131981L84.5041 12.8642C85.6903 13.238 86.4977 14.3371 86.4999 15.5808C86.5021 16.8245 85.6985 17.9263 84.5137 18.3043L44.1173 31.1922C43.5531 31.3722 42.9468 31.3722 42.3826 31.1922L1.98626 18.3043C0.801401 17.9263 -0.0021727 16.8245 4.41291e-06 15.5808C0.00218152 14.3371 0.809608 13.238 1.99579 12.8642L42.3922 0.131981ZM12.294 15.6023L43.25 25.4783L74.2059 15.6023L43.25 5.84555L12.294 15.6023Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.6163 26.4607C20.1923 26.4607 21.4699 27.7383 21.4699 29.3143V35.312C21.4699 36.888 20.1923 38.1656 18.6163 38.1656C17.0403 38.1656 15.7627 36.888 15.7627 35.312V29.3143C15.7627 27.7383 17.0403 26.4607 18.6163 26.4607Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M70.3735 9.94216C70.7913 11.162 70.1411 12.4896 68.9212 12.9075L30.8077 25.9613C29.5878 26.3791 28.2602 25.7289 27.8424 24.509C27.4246 23.2891 28.0748 21.9615 29.2947 21.5437L67.4082 8.48988C68.6281 8.07207 69.9557 8.72228 70.3735 9.94216Z'
                fill='#004772'
              />
              <path
                d='M29.6158 55.8367C29.3667 55.8367 29.1073 55.7952 28.8687 55.7226L17.8694 52.3917C16.7072 52.0389 15.9082 50.9182 15.9082 49.6522V41.4235L21.3352 42.7102V47.5043L26.9075 49.1957V23.887H32.3345V52.9831C32.3345 53.8755 31.9298 54.7264 31.2553 55.266C30.778 55.6396 30.2073 55.8367 29.6262 55.8367H29.6158Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M75.6094 57.2909C76.0612 58.8008 75.2035 60.391 73.6936 60.8428L64.2612 63.6652C62.7514 64.117 61.1612 63.2593 60.7094 61.7495C60.2576 60.2396 61.1153 58.6494 62.6252 58.1976L72.0576 55.3752C73.5674 54.9234 75.1576 55.7811 75.6094 57.2909Z'
                fill='#004772'
              />
            </svg>
          }
        />
      </Box>
    </Menu>
  );
}

export default NavOrders;
