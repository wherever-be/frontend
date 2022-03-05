import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

export default props => {
  const { i18n } = useTranslation();
  const countries = i18n.getResourceBundle(i18n.language, 'country');

  return (
    <Select {...props}>
      {Object.entries(countries)
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(c => (
          <Select.Option key={c[0]}>{c[1]}</Select.Option>
        ))}
    </Select>
  );
};
