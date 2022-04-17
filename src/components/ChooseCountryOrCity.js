import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

export default ({ onChange, value, allowChooseCountry, ...props }) => {
  const { t, i18n } = useTranslation();
  const countries = i18n.getResourceBundle(i18n.language, 'country');
  const cities = i18n.getResourceBundle(i18n.language, 'city');

  let val;
  if (allowChooseCountry) {
    val = value?.country;
    if (val && value?.city) val += ':' + value.city;
  } else {
    val = value?.city;
  }

  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="children"
      value={val}
      onChange={x => {
        if (allowChooseCountry) {
          const newVal = x?.split(':');
          if (newVal?.length === 1) onChange({ country: newVal[0] });
          else if (newVal?.length === 2) onChange({ country: newVal[0], city: newVal[1] });
          else onChange();
        } else {
          onChange({ city: x });
        }
      }}
      placeholder={allowChooseCountry ? t('application:steps.chooseDestination.placeholder.global') : undefined}
      {...props}
    >
      {Object.entries(countries)
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(country => (
          <Select.OptGroup key={country[0]} label={country[1]}>
            {allowChooseCountry ? (
              <Select.Option value={country[0]}>
                {t('application:steps.chooseDestination.placeholder.country', { country: country[1] })}
              </Select.Option>
            ) : null}
            {Object.entries(cities)
              .filter(city => city[1].country === country[0])
              .sort((a, b) => a[1].name.localeCompare(b[1].name))
              .map(city => (
                <Select.Option key={city[0]} value={allowChooseCountry ? country[0] + ':' + city[0] : city[0]}>
                  {city[1].name}
                </Select.Option>
              ))}
          </Select.OptGroup>
        ))}
    </Select>
  );
};
