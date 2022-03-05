import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Settings from '../settings/Settings';
import Content from './Content';

const ApplicationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  const dispatch = useDispatch();
  const number = useSelector(state => state.application.number);

  return (
    <ApplicationContainer>
      <Content />
      <Settings />
    </ApplicationContainer>
  );
};
