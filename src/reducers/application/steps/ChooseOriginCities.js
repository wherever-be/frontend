import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { addFriend, removeFriend, setFriendProps } from '../applicationSlice';
import ChooseCountryOrCity from '../../../components/ChooseCountryOrCity';

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.chooseOriginCities.' + k, ...params);
  const dispatch = useDispatch();
  const appState = useSelector(state => state.application);

  return (
    <>
      {appState.friends.map((friend, i) => {
        return (
          <div style={{ width: '100%', maxWidth: '40rem', display: 'flex', marginBottom: '0.8em' }} key={friend.id}>
            <Input
              style={{ width: 'calc((100% - 5rem) / 2)' }}
              onChange={e => dispatch(setFriendProps({ id: friend.id, name: e.target.value }))}
              value={friend.name}
              placeholder={tLocal(i === 0 ? 'placeholder.first.name' : 'placeholder.other.name')}
              status={appState.highlightInputIssues && !friend.name ? 'error' : undefined}
            />
            <div
              style={{
                fontSize: '0.7rem',
                width: '2.5rem',
                minWidth: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              from
            </div>
            <ChooseCountryOrCity
              value={{ city: friend.city }}
              onChange={({ city }) => dispatch(setFriendProps({ id: friend.id, city }))}
              style={{ width: 'calc((100% - 5rem) / 2)' }}
              placeholder={tLocal(i === 0 ? 'placeholder.first.city' : 'placeholder.other.city')}
              status={appState.highlightInputIssues && !friend.city ? 'error' : undefined}
            />
            <div style={{ width: '2.5rem', minWidth: '2.5rem', paddingLeft: '0.5rem' }}>
              {i === 0 ? null : (
                <Tooltip title={t('common:remove')}>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => dispatch(removeFriend(friend.id))}
                    style={{ width: '100%', maxWidth: '2rem' }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        );
      })}

      <Button type="primary" onClick={() => dispatch(addFriend())} style={{ width: 'fit-content' }}>
        {tLocal('add')}
      </Button>
    </>
  );
};
