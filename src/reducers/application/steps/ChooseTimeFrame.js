import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import { setTimeFrame } from '../applicationSlice';
import Question from '../../../components/Question';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);
  const timeFrame = appState.timeFrame ? [moment(appState.timeFrame.start), moment(appState.timeFrame.end)] : null;

  return (
    <>
      <Question>{t('application:steps.chooseTimeFrame.title')}</Question>
      <DatePicker.RangePicker
        value={timeFrame}
        onChange={(_, newRange) => {
          dispatch(setTimeFrame(newRange));
        }}
      />
      <Button type="primary" style={{ marginTop: '1.5rem' }} disabled={!timeFrame}>
        {t('common:dialog.buttons.continue')}
      </Button>
    </>
  );
};
