import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import Question from '../../../components/Question';
import CardsContainer from '../../../components/CardsContainer';
import Navigation from './Navigation';
import { setChosenDestination, setStep } from '../applicationSlice';

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

  return (
    <>
      <Question>{tLocal('title')}</Question>

      <CardsContainer style={{ flexWrap: 'wrap' }}>
        {resultsByCity.cities.map(c => {
          const cityName = c.name;
          let thumbnail = t('city:' + cityName + '.thumbnail');
          if (thumbnail === cityName + '.thumbnail')
            thumbnail =
              'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/wk83602924-image-kp6buvvu.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=a04a62924388e0bd1d9ff9300ed90d38';

          return (
            <Card
              key={c.name}
              hoverable
              style={{
                width: '100%',
                maxWidth: '15rem',
                margin: '1rem',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: 'none',
              }}
              cover={
                <div
                  style={{
                    width: '100%',
                    height: '15rem',
                    backgroundImage: `url(${thumbnail}})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                />
              }
              onClick={() => {
                dispatch(setChosenDestination(cityName));
                dispatch(setStep('resultsFinal'));
              }}
            >
              <Card.Meta
                title={t('city:' + c.name + '.name')}
                description={tLocal('minTotalPrice', {
                  minTotalPrice: c.minTotalPrice.amount,
                  formatParams: { minTotalPrice: { currency: c.minTotalPrice.unit } },
                })}
              />
            </Card>
          );
        })}
      </CardsContainer>

      <Navigation noContinue />
    </>
  );
};
