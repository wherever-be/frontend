import { createGlobalStyle } from 'styled-components';

import background from '../assets/img/background.webp';

export default createGlobalStyle`
  body {
    background-image: url(${background});
    background-size: cover;
    background-position: right top;
    background-attachment: fixed;
  }

  *, *:before, *:after {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  /* Fix alignment of antd icons (see https://github.com/ant-design/ant-design/issues/13074#issuecomment-671093258) */
  svg {
    vertical-align: baseline;
  }
`;
