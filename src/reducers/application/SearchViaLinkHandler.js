import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { reset, setProps, setStep, search } from './applicationSlice';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search?.startsWith('?search=')) {
      // parse the new search inputs
      const newSearchInputs = JSON.parse(new URLSearchParams(window.location.search).get('search'));

      // remove the "search" query parameter from the URL
      window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);

      // replace the entire state by these inputs and initiate the search
      dispatch(reset());
      dispatch(setProps(newSearchInputs)); // TODO: do proper validation of the input using JSON schema
      dispatch(setStep('chooseDestination'));
      dispatch(search());
    }
  }, [dispatch]);

  return null;
};
