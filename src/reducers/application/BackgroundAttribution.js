import React from 'react';
import styled from 'styled-components';

const AttributionText = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.7rem;
`;

export default () => {
  return (
    <AttributionText>
      Photo by{' '}
      <a href="https://unsplash.com/@rparmly" target="_blank" rel="noreferrer">
        Ross Parmly
      </a>{' '}
      on{' '}
      <a href="https://unsplash.com/s/photos/airplane" target="_blank" rel="noreferrer">
        Unsplash
      </a>
    </AttributionText>
  );
};
