import React from 'react';
import { categories } from '../../utils/categories';


import {
  Container,
  Title,
  Amount,
  Icon,
  Category,
  CategoryName,
  Date,
  Footer
} from './styles';

interface CategoryProps {
  name: string;
  key: string;
}

export type TransactionCardData = {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;

}

type TransactionCardProps = {
  data: TransactionCardData;

};

export function TransactionCard({ data }: TransactionCardProps) {


  const category = categories.filter(item => item.key === data.category.key)[0];


  return (
    <Container

    >

      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && ' - '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} color={category.color} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};