import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDestination } from '../applicationSlice';
import ChooseCountryOrCity from '../../../components/ChooseCountryOrCity';

export default props => {
  const dispatch = useDispatch();
  const destination = useSelector(state => state.application.destination);

  return (
    <ChooseCountryOrCity
      allowChooseCountry
      value={destination}
      onChange={data => dispatch(setDestination(data))}
      {...props}
    />
  );
};
