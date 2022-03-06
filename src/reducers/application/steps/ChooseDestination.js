import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Question from '../../../components/Question';
import ChooseCountry from '../../../components/ChooseCountry';
import ChooseCity from '../../../components/ChooseCity';
import Navigation from './Navigation';
import { setDestination, search } from '../applicationSlice';

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.chooseDestination.' + k, ...params);
  const dispatch = useDispatch();
  const destination = useSelector(state => state.application.destination);

  return (
    <>
      <Question>{tLocal('title')}</Question>

      <table style={{ width: 'calc(min(100%, 25rem))' }}>
        <tbody>
          <tr>
            <td style={{ padding: '0 1rem 0.5rem 0', width: 'auto', whiteSpace: 'nowrap' }}>
              {tLocal('labels.country')}
            </td>
            <td style={{ paddingBottom: '0.5rem', width: '100%' }}>
              <ChooseCountry
                style={{ width: '100%' }}
                value={destination.country}
                onChange={country => dispatch(setDestination({ country }))}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: 'auto', whiteSpace: 'nowrap' }}>{tLocal('labels.city')}</td>
            <td style={{ width: '100%' }}>
              <ChooseCity
                style={{ width: '100%' }}
                value={destination.city}
                onChange={city =>
                  dispatch(
                    setDestination(
                      city ? { country: t('city:' + city + '.country'), city } : { country: destination.country },
                    ),
                  )
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Navigation>
        <Button type="primary" icon={<SearchOutlined />} onClick={() => dispatch(search())}>
          Search
        </Button>
      </Navigation>
    </>
  );
};
