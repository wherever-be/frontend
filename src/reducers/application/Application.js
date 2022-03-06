import React from 'react';
import styled from 'styled-components';

import Settings from '../settings/Settings';
import Content from './Content';
import BackgroundAttribution from './BackgroundAttribution';

const ApplicationContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  return (
    <ApplicationContainer>
      <BackgroundAttribution />
      <Settings />
      <Content />
    </ApplicationContainer>
  );
};
