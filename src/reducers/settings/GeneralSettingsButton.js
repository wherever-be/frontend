import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';

export default () => {
  const { t } = useTranslation();
  const tLocal = (k, ...params) => t('settings:general.' + k, ...params);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Tooltip title={tLocal('title')}>
        <Button
          shape="circle"
          onClick={() => setModalOpen(true)}
          icon={<SettingOutlined />}
          size="large"
          style={{ marginLeft: '0.5rem' }}
        />
      </Tooltip>
      <Modal
        title={tLocal('title')}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText={t('common:dialog.buttons.ok')}
      >
        N/A
      </Modal>
    </>
  );
};
