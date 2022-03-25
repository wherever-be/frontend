import React from 'react';
import styled from 'styled-components';

import Settings from '../settings/Settings';
import Content from './Content';
import SearchViaLinkHandler from './SearchViaLinkHandler';

const ApplicationContainer = styled.div`
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  return (
    <ApplicationContainer>
      <Settings />
      <Content />
      <SearchViaLinkHandler />
    </ApplicationContainer>
  );
};
