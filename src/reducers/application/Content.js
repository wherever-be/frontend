import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { search } from './applicationSlice';

import ChooseTimeFrame from './steps/ChooseTimeFrame';
import ChooseDurationRange from './steps/ChooseDurationRange';
import ChooseOriginCities from './steps/ChooseOriginCities';
import ChooseDestination from './steps/ChooseDestination';
import ResultsCities from './steps/ResultsCities';
import ResultsFinal from './steps/ResultsFinal';

const Claim = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 5rem;
  margin: 1rem 0 0 0;
  font-family: Quicksand, Inter, sans-serif;
  color: #010203;
  transition: font-size 0.2s, margin-bottom 0.2s;
  line-height: 1;
  margin-bottom: 2rem;

  @media (max-width: 35rem) {
    font-size: 4rem;
  }

  @media (max-width: 28rem) {
    font-size: 3rem;
  }

  @media (max-width: 21rem) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  width: 60rem;
  max-width: calc(100vw - 4rem);
  margin: 0 auto 6rem auto;
  box-shadow: 0px 1px 3px 0px rgb(60 64 67 / 30%), 0px 4px 8px 3px rgb(60 64 67 / 15%);
  padding: 1rem 1rem 0 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputDescription = styled.span`
  color: #5f6368;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
`;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);

  const hasResults = appState.search?.results?.length > 0;
  const needsPickDestination =
    hasResults &&
    [...new Set(appState.search.results.map(r => r.destination))].length > 1 &&
    !appState.chosenDestination;

  return (
    <>
      <Claim>{t('application:claim')}</Claim>

      <SearchContainer>
        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '25%',
              padding: '1rem 1rem 1.5rem 1rem',
              minWidth: '10rem',
              flexGrow: '1',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InputDescription>{t('application:steps.chooseDestination.title')}</InputDescription>
            <ChooseDestination style={{ width: '100%' }} />
          </div>
          <div
            style={{
              width: '37.5%',
              padding: '1rem 1rem 1.5rem 1rem',
              minWidth: '15rem',
              flexGrow: '1',
            }}
          >
            <InputDescription>{t('application:steps.chooseTimeFrame.title')}</InputDescription>
            <ChooseTimeFrame />
          </div>
          <div
            style={{
              width: '37.5%',
              padding: '1rem 1rem 1.5rem 1rem',
              minWidth: '15rem',
              flexGrow: '1',
            }}
          >
            <InputDescription>{t('application:steps.chooseDurationRange.title')}</InputDescription>
            <ChooseDurationRange />
          </div>
        </div>
        <div style={{ padding: '1rem 1rem 1.5rem 1rem', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <InputDescription>{t('application:steps.chooseOriginCities.title')}</InputDescription>
          <ChooseOriginCities />
        </div>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={() => dispatch(search())}
          loading={appState.search?.loading}
          style={{ margin: '0 auto', transform: 'translateY(50%)', borderRadius: '9999px' }}
        >
          {t('application:search')}
        </Button>
      </SearchContainer>

      {hasResults ? needsPickDestination ? <ResultsCities /> : <ResultsFinal /> : null}
    </>
  );
};
