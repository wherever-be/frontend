import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Divider, message, Steps, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';

import Question from '../../../components/Question';
import CardsContainer from '../../../components/CardsContainer';
import { tCurrency, tDate, tTime } from '../../../utils/utils';

function getJourneyStepProps(t, connection) {
  return {
    title: (
      <>
        <Tooltip title={t('airport:' + connection.departure.port)}>{connection.departure.port}</Tooltip> ➔{' '}
        <Tooltip title={t('airport:' + connection.arrival.port)}>{connection.arrival.port}</Tooltip>
      </>
    ),
    description: (
      <div style={{ fontSize: '0.8rem', lineHeight: '120%', marginTop: '0.2rem' }}>
        {tDate(t, new Date(connection.departure.date))}
        <br />
        {tTime(t, new Date(connection.departure.date))} – {tTime(t, new Date(connection.arrival.date))}
        <br />
        {tCurrency(t, connection.price)}
        <br />
        <Button
          type="primary"
          size="small"
          href={connection.bookingLink}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: '0.5rem' }}
        >
          {t('application:steps.resultsFinal.book')}
        </Button>
      </div>
    ),
  };
}

const ResultItem = ({ id }) => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.resultsFinal.' + k, ...params);
  const result = useSelector(state => state.application.search?.results?.find(r => r.id === id));
  if (!result) return null;

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
  const application = useSelector(state => state.application);

  let results = application.search?.results ?? [];
  if (application.chosenDestination) results = results.filter(r => r.destination === application.chosenDestination);

  return (
    <>
      <Question style={{ marginBottom: '0.5rem' }}>{tLocal('title')}</Question>
      <Button
        type="primary"
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const data = {
            timeFrame: application.timeFrame,
            durationRange: application.durationRange,
            friends: application.friends,
            destination: application.destination,
          };

          const searchParams = new URLSearchParams();
          searchParams.append('search', JSON.stringify(data));
          const link = window.location.protocol + '//' + window.location.host + '/?' + searchParams.toString();

          copy(link);
          message.success(tLocal('copiedToClipboard'));
        }}
      >
        Copy a link to these results
      </Button>

      <CardsContainer style={{ flexDirection: 'column' }}>
        {results.map(r => (
          <ResultItem key={r.id} id={r.id} />
        ))}
      </CardsContainer>
    </>
  );
};
