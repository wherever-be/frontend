import React from 'react';
import styled from 'styled-components';

const Claim = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 10rem;
  margin: 5rem 0 0 0;
  font-family: Playball, Inter, sans-serif;
  color: #010203;
  transition: font-size 0.2s, margin-bottom 0.2s;
  line-height: 1;
  margin-bottom: 2rem;

  @media (max-width: 80rem) {
    font-size: 8rem;
  }

  @media (max-width: 65rem) {
    font-size: 6rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 50rem) {
    font-size: 5rem;
  }

  @media (max-width: 45rem) {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 35rem) {
    font-size: 3rem;
  }
`;

const ClaimSub = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 200;
  margin: 0;
  max-width: 40rem;
  transition: font-size 0.2s;

  @media (max-width: 65rem) {
    font-size: 1.5rem;
  }

  @media (max-width: 45rem) {
    font-size: 1.2rem;
  }
`;

export default () => {
  return (
    <>
      <Claim>Unlimited freedom</Claim>
      <ClaimSub>Conveniently reconnect with your international friends and plan your journeys right now.</ClaimSub>
    </>
  );
};
