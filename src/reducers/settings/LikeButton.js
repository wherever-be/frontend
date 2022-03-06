import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export default () => {
  const { t } = useTranslation();

  return (
    <a href="https://github.com/wherever-be" target="_blank" rel="noreferrer">
      <Tooltip title={t('settings:like.title')} placement="bottomRight">
        <Button shape="circle" icon={<HeartOutlined />} size="large" style={{ marginLeft: '0.5rem' }} />
      </Tooltip>
    </a>
  );
};
