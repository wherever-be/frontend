import React from 'react';
import styled from 'styled-components';

import LikeButton from './LikeButton';

const ButtonContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
`;

export default () => {
  return (
    <ButtonContainer>
      <LikeButton />
    </ButtonContainer>
  );
};
