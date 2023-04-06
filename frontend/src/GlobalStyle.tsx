import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') 
      format('woff');
     font-weight: normal;
     font-style: normal;
}

html{
  scroll-behavior: smooth;
}

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

li{
  list-style: none;
}



// react-pagination styled 지우기
.pagination {
    display: flex;
    justify-content: center;
    /* margin-top: 15px; */
    width: 100%;
    height: 10%;
    /* border: 1px solid red; */
  }
  
  ul {
    /* list-style: none; */
    /* padding: 0; */
  }
  
  ul.pagination li {
    display: inline-block;
    width: 10%;
    height: 100%;
    border: 1px solid #e1dbff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child{
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child{
    border-radius: 0 5px 5px 0;
  }
  
  ul.pagination li a {
    text-decoration: none;
    color: #6255A4;
    font-size: 1rem;
  }
  
  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #6255A4;
  }
  
  ul.pagination li a:hover,
  ul.pagination li a.active {
    /* background-color: #6255A4; */
  }
  
  .page-selection {
    width: 48px;
    height: 30px;
    color: #6255A4;
  }
`;

export default GlobalStyle;
