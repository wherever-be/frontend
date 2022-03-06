import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card } from 'antd';

import Question from '../../../components/Question';
import Navigation from './Navigation';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function sumAll(arr) {
  return arr.reduce((sum, x) => sum + x, 0);
}

function getJourneyCost(journey) {
  return journey.homeToDest.price.amount + journey.destToHome.price.amount;
}

function useResultsByCity() {
  const results = useSelector(state => state.application.search?.results);
  const { t } = useTranslation();
  if (!results) return;

  const cities = [...new Set(results.map(r => r.destination))].sort((a, b) =>
    t('city:' + a).localeCompare(t('city:' + b)),
  );

  return {
    cities: cities.map(c => ({
      name: c,
      minTotalPrice: {
        amount: Math.min(...results.filter(r => r.destination === c).map(r => sumAll(r.journeys.map(getJourneyCost)))),
        unit: 'EUR',
      },
    })),
  };
}

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.resultsCities.' + k, ...params);
  const dispatch = useDispatch();
  const resultsByCity = useResultsByCity();

  if (!resultsByCity) return null;
  console.log(resultsByCity);

  return (
    <>
      <Question>{tLocal('title')}</Question>

      <CardsContainer>
        {resultsByCity.cities.map(c => (
          <Card
            key={c.name}
            hoverable
            style={{ width: 'calc(min(100%, 20rem))', margin: '1rem' }}
            cover={<img alt={c.name} src="https://fakeimg.pl/300x100/" />}
          >
            <Card.Meta
              title={t('city:' + c.name + '.name')}
              description={tLocal('minTotalPrice', {
                minTotalPrice: c.minTotalPrice.amount,
                formatParams: { minTotalPrice: { currency: c.minTotalPrice.unit } },
              })}
            />
          </Card>
        ))}
      </CardsContainer>

      <Navigation />
    </>
  );
};
