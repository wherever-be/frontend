import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { getSteps } from './steps';
import { setStep } from '../applicationSlice';

export default ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.application.step);
  const stepList = useSelector(getSteps);

  const currentStepIdx = stepList.findIndex(s => s.name === currentStep);
  if (currentStepIdx === -1) return null;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {currentStepIdx === 0 ? null : (
        <Button onClick={() => dispatch(setStep(stepList[currentStepIdx - 1].name))} style={{ marginRight: '0.5rem' }}>
          {t('common:dialog.buttons.back')}
        </Button>
      )}
      {currentStepIdx === stepList.length - 1 || children ? null : (
        <Button
          type="primary"
          onClick={() => dispatch(setStep(stepList[currentStepIdx + 1].name))}
          disabled={stepList[currentStepIdx].nextStepDisabled}
        >
          {t('common:dialog.buttons.continue')}
        </Button>
      )}
      {children}
    </div>
  );
};
