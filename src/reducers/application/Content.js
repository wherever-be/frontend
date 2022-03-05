import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import { setTimeFrame } from './applicationSlice';

const Claim = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 10rem;
  margin: 5rem 0 0 0;
  font-family: Playball, Inter, sans-serif;
  color: #010203;
  transition: font-size 0.2s, margin-bottom 0.2s;
  line-height: 1;
  margin-bottom: 2rem;

  @media (max-width: 80rem) {
    font-size: 8rem;
  }

  @media (max-width: 65rem) {
    font-size: 6rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 50rem) {
    font-size: 5rem;
  }

  @media (max-width: 45rem) {
    font-size: 4rem;
  }

  @media (max-width: 35rem) {
    font-size: 3rem;
  }
`;

const Question = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

export default () => {
  const appState = useSelector(state => state.application);
  const dispatch = useDispatch();

  const timeFrame = appState.timeFrame ? [moment(appState.timeFrame.start), moment(appState.timeFrame.end)] : null;

  return (
    <>
      <Claim>Wherever be...?</Claim>

      <Question>In which time frame do you want to meet?</Question>
      <DatePicker.RangePicker
        value={timeFrame}
        onChange={(_, newRange) => {
          dispatch(setTimeFrame(newRange));
        }}
      />
      <Button type="primary" style={{ marginTop: '1.5rem' }} disabled={!timeFrame}>
        Continue
      </Button>
    </>
  );
};
