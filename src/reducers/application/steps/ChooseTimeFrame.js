import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import moment from 'moment';

import { setTimeFrame } from '../applicationSlice';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);
  const timeFrame = appState.timeFrame ? [moment(appState.timeFrame.start), moment(appState.timeFrame.end)] : null;

  return (
    <DatePicker.RangePicker
      value={timeFrame}
      onChange={(_, newRange) => {
        dispatch(setTimeFrame(newRange));
      }}
      placeholder={[
        t('application:steps.chooseTimeFrame.placeholder.start'),
        t('application:steps.chooseTimeFrame.placeholder.end'),
      ]}
      status={
        appState.highlightInputIssues && (!appState.timeFrame?.start || !appState.timeFrame?.end) ? 'error' : undefined
      }
    />
  );
};
