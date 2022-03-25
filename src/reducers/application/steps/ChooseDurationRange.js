import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Slider } from 'antd';

import { setDurationRange } from '../applicationSlice';
import Question from '../../../components/Question';
import Navigation from './Navigation';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);

  return (
    <>
      <Question>{t('application:steps.chooseDurationRange.title')}</Question>

      <div style={{ width: 'calc(min(80vw, 30rem))' }}>
        <Slider
          range
          value={[appState.durationRange.min, appState.durationRange.max]}
          onChange={newRange => dispatch(setDurationRange(newRange))}
          min={1}
          max={20}
          marks={{
            [appState.durationRange.min]: t('application:steps.chooseDurationRange.numDays', {
              days: appState.durationRange.min,
            }),
            [appState.durationRange.max]: t('application:steps.chooseDurationRange.numDays', {
              days: appState.durationRange.max,
            }),
          }}
        />
      </div>

      <Navigation />
    </>
  );
};
