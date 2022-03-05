import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, List, Modal, Select, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Question from '../../../components/Question';
import Navigation from './Navigation';
import { addFriend, removeFriend } from '../applicationSlice';

export default () => {
  const { t, i18n } = useTranslation();
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

  const cities = i18n.getResourceBundle(i18n.language, 'city');

  return (
    <>
      <Question>{tLocal('title')}</Question>

      {friends.length === 0 ? null : (
        <List
          dataSource={friends}
          style={{ width: 'calc(min(100%, 25rem))', marginBottom: '1rem' }}
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
                <Select style={{ width: '100%' }} value={newFriendCity} onChange={e => setNewFriendCity(e)}>
                  {Object.entries(cities)
                    .sort((a, b) => a[1].name.localeCompare(b[1].name))
                    .map(c => (
                      <Select.Option key={c[0]}>
                        {tLocal('addFriend.cityName', { city: c[1].name, country: t('country:' + c[1].country) })}
                      </Select.Option>
                    ))}
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Navigation />
    </>
  );
};
