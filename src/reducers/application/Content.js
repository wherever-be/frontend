import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ChooseTimeFrame from './steps/ChooseTimeFrame';
import ChooseDurationRange from './steps/ChooseDurationRange';
import ChooseOriginCities from './steps/ChooseOriginCities';

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

export default () => {
  const { t } = useTranslation();
  const step = useSelector(state => state.application.step);

  return (
    <>
      <Claim>{t('application:claim')}</Claim>

      {step === 'chooseTimeFrame' ? <ChooseTimeFrame /> : null}
      {step === 'chooseDurationRange' ? <ChooseDurationRange /> : null}
      {step === 'chooseOriginCities' ? <ChooseOriginCities /> : null}
    </>
  );
};
