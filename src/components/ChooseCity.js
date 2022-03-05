import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

export default props => {
  const { t, i18n } = useTranslation();
  const cities = i18n.getResourceBundle(i18n.language, 'city');

  return (
    <Select {...props}>
      {Object.entries(cities)
        .sort((a, b) => a[1].name.localeCompare(b[1].name))
        .map(c => (
          <Select.Option key={c[0]}>
            {t('common:chooseCity.cityName', { city: c[1].name, country: t('country:' + c[1].country) })}
          </Select.Option>
        ))}
    </Select>
  );
};
