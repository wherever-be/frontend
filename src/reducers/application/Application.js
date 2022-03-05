import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';

import Settings from '../settings/Settings';
import { incrementNumber } from './applicationSlice';

const ApplicationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default () => {
  const dispatch = useDispatch();
  const number = useSelector(state => state.application.number);

  return (
    <ApplicationContainer>
      The number is {number}.<br />
      <Button
        type="primary"
        onClick={() => {
          dispatch(incrementNumber());
        }}
      >
        Increment number
      </Button>
      <Settings />
    </ApplicationContainer>
  );
};
