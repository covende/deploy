import styled from '@emotion/styled';

export const StyledLoading = styled.div`
  background-color: #fff;
  color: #bdbdbd;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;  // Alinear los elementos en columna
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    width: 1em;
    height: 1em;
    border-radius: 50%;
    color: #00adf6;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    animation: mulShdSpin 1.3s infinite linear;
    transform: translateZ(0);
    margin-top: -72px; 
  }
  
  @keyframes mulShdSpin {
    0%, 100% {
      box-shadow: 0 -3em 0 0.2em, 
      2em -2em 0 0em, 3em 0 0 -1em, 
      2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 
      3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 
      2em -2em 0 0, 3em 0 0 0.2em, 
      2em 2em 0 0, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, 
      -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, 
      -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, 
      -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 
      3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 
      3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }
`;



