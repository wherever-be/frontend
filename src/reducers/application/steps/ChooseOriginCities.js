import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, List, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Question from '../../../components/Question';
import ChooseCity from '../../../components/ChooseCity';
import Navigation from './Navigation';
import { addFriend, removeFriend } from '../applicationSlice';

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('application:steps.chooseOriginCities.' + k, ...params);
  const dispatch = useDispatch();
  const friends = useSelector(state => state.application.friends);

  const [modalOpen, setModalOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendCity, setNewFriendCity] = useState('');
  const okButtonDisabled = !newFriendName || !newFriendCity || !!friends.find(f => f.name === newFriendName);

  const resetModalInputs = () => {
    setNewFriendName('');
    setNewFriendCity('');
  };

  return (
    <>
      <Question>{tLocal('title')}</Question>

      {friends.length === 0 ? null : (
        <List
          dataSource={friends}
          style={{ width: '100%', maxWidth: '25rem', marginBottom: '1rem' }}
          renderItem={friend => (
            <List.Item
              actions={[
                <Tooltip title={t('common:remove')}>
                  <Button icon={<DeleteOutlined />} onClick={() => dispatch(removeFriend(friend.name))} />
                </Tooltip>,
              ]}
            >
              {tLocal('friend', {
                name: friend.name,
                city: t('city:' + friend.city + '.name'),
              })}
            </List.Item>
          )}
        />
      )}

      <Button type="primary" onClick={() => setModalOpen(true)}>
        {tLocal('addFriend.title')}
      </Button>
      <Modal
        title={tLocal('addFriend.title')}
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          resetModalInputs();
        }}
        onOk={() => {
          setModalOpen(false);
          dispatch(addFriend({ name: newFriendName, city: newFriendCity }));
          resetModalInputs();
        }}
        okButtonProps={{ disabled: okButtonDisabled }}
      >
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '0 1rem 0.5rem 0' }}>{tLocal('addFriend.labels.name')}</td>
              <td style={{ paddingBottom: '0.5rem' }}>
                <Input value={newFriendName} onChange={e => setNewFriendName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '1rem' }}>{tLocal('addFriend.labels.city')}</td>
              <td>
                <ChooseCity style={{ width: '100%' }} value={newFriendCity} onChange={e => setNewFriendCity(e)} />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Navigation />
    </>
  );
};
