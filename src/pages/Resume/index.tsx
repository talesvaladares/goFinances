import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  LoadContainer,
  Content,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectIcon,
  MonthSelectButton,

} from './styles';

import { categories } from '../../utils/categories';
import { formatCurrency } from '../../utils/formatCurrency';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';

interface CategoryProps {
  name: string;
  key: string;
}

export type TransactionData = {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;

}

type SumOfTheExpenseAmountOfEachCategory = {
  categoryName: string,
  categoryAmountFormatted: string;
  categoryAmountValue: number;
  color: string;
  key: string;
  percentFormatted: string;
  percentValue: number;
  percent: string
}


export function Resume() {

  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategory, setTotalByCategory] = useState<SumOfTheExpenseAmountOfEachCategory[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();

  function handleDateChange(action: 'next' | 'back') {

    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
    else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);

    const response = await AsyncStorage.getItem("@gofinances:transactions");
    const responseParsered = response ? JSON.parse(response) : [];

    //recupero todas as transações de saídas
    const expensives = responseParsered.filter(
      (transaction: TransactionData) =>
        transaction.type === 'negative' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    ) as TransactionData[];

    const expensivesTotalAllCategories = expensives.reduce((acc: number, item: TransactionData) => {

      return acc += Number(item.amount);

    }, 0)

    const expensivesTotal = expensives.reduce((acc: number, item: TransactionData) => {
      return acc + Number(item.amount)
    }, 0)

    const totalByCategory = [] as SumOfTheExpenseAmountOfEachCategory[];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category.key === category.key) {
          categorySum += Number(expensive.amount)
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          categoryName: category.name,
          categoryAmountFormatted: formatCurrency(categorySum),
          categoryAmountValue: categorySum,
          color: category.color,
          key: category.key,
          percentFormatted: `${(categorySum / expensivesTotal * 100).toFixed(0)}%`,
          percentValue: (categorySum / expensivesTotal * 100),
          percent: `${(categorySum / expensivesTotalAllCategories * 100).toFixed(0)}%`
        });
      }

    });

    setTotalByCategory(totalByCategory);
    setIsLoading(false);
  }

  //faz a página recarregar quando ela recebe focu
  //assim ela recarrega os itens da lista
  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))


  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading
          ? (
            <LoadContainer>
              <ActivityIndicator
                color={theme.colors.primary}
                size="large"
              />
            </LoadContainer>
          )
          : (
            <>
              <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24,
                  paddingBottom: useBottomTabBarHeight()
                }}
              >
                <MonthSelect>
                  <MonthSelectButton
                    onPress={() => handleDateChange('back')}
                  >
                    <MonthSelectIcon name="chevron-left" />
                  </MonthSelectButton>

                  <Month>
                    {
                      format(selectedDate, 'MMMM , yyyy', { locale: ptBR })
                    }
                  </Month>

                  <MonthSelectButton
                    onPress={() => handleDateChange('next')}
                  >
                    <MonthSelectIcon name="chevron-right" />
                  </MonthSelectButton>

                </MonthSelect>

                <ChartContainer>
                  <VictoryPie
                    data={totalByCategory}
                    colorScale={totalByCategory.map(item => item.color)}
                    style={{
                      labels: {
                        fontSize: RFValue(18),
                        fontWeight: 'bold',
                        fill: theme.colors.shape
                      }

                    }}
                    labelRadius={80}
                    x="percent"
                    y="categoryAmountValue"

                  />
                </ChartContainer>
                {
                  totalByCategory.map(item => (
                    <HistoryCard
                      key={item.key}
                      title={item.categoryName}
                      amount={item.categoryAmountFormatted}
                      color={item.color}
                    />
                  ))
                }
              </Content>
            </>
          )
      }
    </Container>
  );
};