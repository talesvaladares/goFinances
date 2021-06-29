import React from 'react'

import {
  Container,
  Title,
  Amount
} from './styles';

interface Props {
  amount: string;
  color: string;
  title: string;
}

export function HistoryCard({amount, color, title}: Props){
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};