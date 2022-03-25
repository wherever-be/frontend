import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    overflow-x: hidden;
    background-color: #f9fafc;
  }

  *, *:before, *:after {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  /* Fix alignment of antd icons (see https://github.com/ant-design/ant-design/issues/13074#issuecomment-671093258) */
  svg {
    vertical-align: baseline;
  }

  ::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    cursor: pointer;
    width: 12px;
    border: 3px solid hsla(0, 0%, 100%, 0);
    background-clip: padding-box;
    background-color: rgba(53, 65, 76, 0.3);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 70, 104, 0.4);
    cursor: pointer;
  }
`;
