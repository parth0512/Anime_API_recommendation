import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    *{
    margin: 0;
    padding:0;
    box-sizing:border-box;
    list-style:none;
    text-decoration:none;
    font-family:"Inter" , sans-serif;
    }
    
    body{
    color: #6c7983 ;
    font-size: 1.2rem;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Responsive Base Styles */
    @media (max-width: 1200px) {
      body {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 768px) {
      body {
        font-size: 0.9rem;
      }
    }
`;

export default GlobalStyle;
