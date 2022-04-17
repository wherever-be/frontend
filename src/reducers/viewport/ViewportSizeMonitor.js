import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { setSize } from './viewportSlice';

export default () => {
  const dispatch = useDispatch();
  const updateSizeDebounced = useRef(debounce((width, height) => dispatch(setSize({ width, height })), 50)).current;
  const updateSize = useCallback(() => {
    updateSizeDebounced(window.innerWidth, window.innerHeight);
  }, [updateSizeDebounced]);
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);
  return null;
};
