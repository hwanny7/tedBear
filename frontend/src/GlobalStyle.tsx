import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, 
*::before, 
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') 
      format('woff');
     font-weight: normal;
     font-style: normal;
};


a {
  text-decoration: none; /* 링크의 밑줄 제거 */
  color: inherit; /* 링크의 색상 제거 */
};

`;

export default GlobalStyle;
