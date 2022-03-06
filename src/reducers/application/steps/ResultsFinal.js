import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Divider, Steps, Tooltip } from 'antd';

import Question from '../../../components/Question';
import CardsContainer from '../../../components/CardsContainer';
import Navigation from './Navigation';
import { tCurrency, tDate } from '../../../utils/utils';

function getJourneyStepProps(t, connection) {
  return {
    title: (
      <>
        <Tooltip title={t('airport:' + connection.departure.port)}>{connection.departure.port}</Tooltip> ➔{' '}
        <Tooltip title={t('airport:' + connection.arrival.port)}>{connection.arrival.port}</Tooltip>
      </>
    ),
    description: (
      <>
        {tDate(t, new Date(connection.departure.date)) + ', ' + tCurrency(t, connection.price)}
        <br />
        <Button
          type="primary"
          size="small"
          href={connection.bookingLink}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: '0.3rem' }}
        >
          {t('application:steps.resultsFinal.book')}
        </Button>
      </>
    ),
  };
}

const ResultItem = ({ id }) => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.resultsFinal.' + k, ...params);
  const result = { ...useSelector(state => state.application.search?.results?.find(r => r.id === id)) };
  if (!result) return null;

  result.journeys = [
    {
      friendName: 'Chris',
      staysHome: true,
    },
    {
      friendName: 'Joshua',
      staysHome: false,
      homeToDest: {
        departure: {
          date: '2015-12-12T13:52:00.000Z',
          port: 'ARN',
        },
        arrival: {
          date: '2015-12-12T16:31:00.000Z',
          port: 'BRU',
        },
        price: { amount: 48.2, unit: 'EUR' },
        bookingLink: 'http://www.ryanair.com/book/coolflights.php',
      },
      destToHome: {
        departure: {
          date: '2015-12-17T23:11:00.000Z',
          port: 'BRU',
        },
        arrival: {
          date: '2015-12-18T02:21:00.000Z',
          port: 'NYO',
        },
        price: { amount: 98.1, unit: 'EUR' },
        bookingLink: 'http://www.wizzair.com/book/otherflights.cgi',
      },
    },
    {
      friendName: 'Charlotte',
      staysHome: false,
      homeToDest: {
        departure: {
          date: '2015-12-11T13:52:00.000Z',
          port: 'CIA',
        },
        arrival: {
          date: '2015-12-11T16:31:00.000Z',
          port: 'BRU',
        },
        price: { amount: 39.23, unit: 'EUR' },
        bookingLink: 'http://www.ryanair.com/book/coolflights.php',
      },
      destToHome: {
        departure: {
          date: '2015-12-15T23:11:00.000Z',
          port: 'BRU',
        },
        arrival: {
          date: '2015-12-16T02:21:00.000Z',
          port: 'CIA',
        },
        price: { amount: 12.23, unit: 'EUR' },
        bookingLink: 'http://www.wizzair.com/book/otherflights.cgi',
      },
    },
  ];

  const firstDeparture = Math.min(
    ...result.journeys.filter(j => j.homeToDest).map(j => +new Date(j.homeToDest.departure.date)),
  );
  const lastArrival = Math.max(
    ...result.journeys.filter(j => j.destToHome).map(j => +new Date(j.destToHome.arrival.date)),
  );
  const totalDurationMs = lastArrival - firstDeparture;

  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '60rem',
        margin: '1rem',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      {result.journeys.map((j, jIdx) => {
        const startPercent = ((+new Date(j.homeToDest?.departure?.date) - firstDeparture) / totalDurationMs) * 100;
        const endPercent = ((+new Date(j.destToHome?.arrival?.date) - firstDeparture) / totalDurationMs) * 100;

        return (
          <React.Fragment key={jIdx}>
            <Divider style={{ marginTop: jIdx === 0 ? 0 : '2rem', marginBottom: 0 }}>
              <b>{j.friendName}</b>
              {j.staysHome
                ? ' · ' + tLocal('staysHome')
                : ' · ' + tCurrency(t, { amount: j.homeToDest.price.amount + j.destToHome.price.amount, unit: 'EUR' })}
            </Divider>

            {j.staysHome ? null : (
              <div
                style={{
                  position: 'relative',
                  left: startPercent + '%',
                  width: endPercent - startPercent + '%',
                  marginTop: '1rem',
                }}
              >
                <Steps progressDot current={2}>
                  <Steps.Step {...getJourneyStepProps(t, j.homeToDest)} />
                  <Steps.Step {...getJourneyStepProps(t, j.destToHome)} />
                </Steps>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </Card>
  );
};

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.resultsFinal.' + k, ...params);
  const results = useSelector(state =>
    state.application.search?.results?.filter(r => r.destination === state.application.chosenDestination),
  );

  return (
    <>
      <Question>{tLocal('title')}</Question>

      <CardsContainer style={{ flexDirection: 'column' }}>
        {results.map(r => (
          <ResultItem key={r.id} id={r.id} />
        ))}
      </CardsContainer>

      <Navigation />
    </>
  );
};
