import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Slider } from 'antd';

import { setDurationRange } from '../applicationSlice';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);

  return (
    <Slider
      range
      value={[appState.durationRange.min, appState.durationRange.max]}
      onChange={newRange => dispatch(setDurationRange(newRange))}
      min={1}
      max={20}
      tipFormatter={null}
      marks={{
        [appState.durationRange.min]: t('application:steps.chooseDurationRange.numDays', {
          days: appState.durationRange.min,
        }),
        [appState.durationRange.max]: t('application:steps.chooseDurationRange.numDays', {
          days: appState.durationRange.max,
        }),
      }}
    />
  );
};
