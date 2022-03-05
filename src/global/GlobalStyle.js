import { createGlobalStyle } from 'styled-components';

import background from '../assets/img/background.webp';

export default createGlobalStyle`
  body {
    background-image: url(${background});
    background-size: cover;
    background-position: right top;
    overflow: hidden;
  }

  *, *:before, *:after {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }
`;
