import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import {useTheme} from 'styled-components';

import {formatCurrency} from '../../utils/formatCurrency';


import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCardsList,
  TransactionsContainer,
  TransactionsList,
  Title,
  LogoutButton,
  LoadContainer
} from './styles';

export type TransactionProps = TransactionCardData & {
  id: string;
}

type HighlightCardsProps = {
  entriesTotal: {
    amount: string;
    lastTransactionDate: string;
  },
  expensiveTotal: {
    amount: string;
    lastTransactionDate: string;
  },
  total: {
    amount: string;
    lastTransactionDate: string;
  };
}

export function Dashboard() {

  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [HighlightCardsListData, setHighlightCardsList] = useState<HighlightCardsProps>();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  async function loadTransactions() {

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const response = await AsyncStorage.getItem("@gofinances:transactions");

    if (response) {

      setIsLoading(true);

      const data = JSON.parse(response);

      const transactionsFormatted: TransactionProps[] = data.map((item: TransactionProps) => {

        //para calcular o total de entrada e saída
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        }
        else {
          expensiveTotal += Number(item.amount);
        }

        const date = new Date(item.date);
        const dateFormatted = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(date);

        return {
          id: item.id,
          amount: formatCurrency(Number(item.amount)),
          type: item.type,
          category: item.category,
          name: item.name,
          date: dateFormatted,
        }
      });

      const lastTransacationDateEntrie = getLastTransactionDate(data, 'positive');
      const lastTransacationDateExpensive = getLastTransactionDate(data, 'negative');
      const totalInterval = `01 a ${lastTransacationDateEntrie}`

      setHighlightCardsList({
        entriesTotal: {
          amount: formatCurrency(entriesTotal),
          lastTransactionDate: lastTransacationDateEntrie
        },
        expensiveTotal: {
          amount: formatCurrency(expensiveTotal),
          lastTransactionDate: lastTransacationDateExpensive
        },
        total: {
          amount: formatCurrency(entriesTotal - expensiveTotal),
          lastTransactionDate: totalInterval
        } ,
      });
      
      const listInverted = transactionsFormatted.reverse();

      setTransactions(listInverted);
      setIsLoading(false);

      
    }
    else {
      setIsLoading(false);
      return [] as TransactionProps[];
    }

  }

  //função para pegar a data da ultima transação
  function getLastTransactionDate(collection: TransactionProps[], type : 'positive' | 'negative'){
     //pega a data da ultima transação
     const lastTransactionEntries = Math.max.apply(
      Math,
      collection.filter((transaction ) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime()));

    const lastDateTransactionEntriesFormatted = new Date(lastTransactionEntries)
      .toLocaleDateString('pt-Br',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

    return lastDateTransactionEntriesFormatted;
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  //faz a página recarregar quando ela recebe focu
  //assim ela recarrega os itens da lista
  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      {
        isLoading
          ? <LoadContainer>
           <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          : (
            <>
              <Header>
                <UserWrapper>
                  <UserInfo>
                    <Photo
                      source={{
                        uri:
                          'https://avatars.githubusercontent.com/u/34697327?v=4'
                      }}
                    />
                    <User>
                      <UserGreeting>Olá,</UserGreeting>
                      <UserName>Tales</UserName>
                    </User>
                  </UserInfo>
                  <LogoutButton onPress={() => { }}>
                    <Icon name="power" />
                  </LogoutButton>
                </UserWrapper>
              </Header>
              <HighlightCardsList>
                <HighlightCard
                  type="up"
                  title="Entrada(s)"
                  amount={HighlightCardsListData?.entriesTotal.amount ?? 'R$ 0,00'}
                  lastTransaction={'Última entrada '+HighlightCardsListData?.entriesTotal.lastTransactionDate ?? '00/00/00'}
                />
                <HighlightCard
                  type="down"
                  title="Saída(s)"
                  amount={HighlightCardsListData?.expensiveTotal.amount ?? 'R$ 0,00'}
                  lastTransaction={'Última saída '+HighlightCardsListData?.expensiveTotal.lastTransactionDate ?? '00/00/00'}
                />
                <HighlightCard
                  type="total"
                  title="Total"
                  amount={HighlightCardsListData?.total.amount ?? 'R$ 00,00'}
                  lastTransaction={HighlightCardsListData?.total.lastTransactionDate ?? '00/00/00'}
                />
              </HighlightCardsList>
              <TransactionsContainer>
                <Title>Listagem</Title>
                <TransactionsList
                  data={transactions}
                  keyExtractor={(item: TransactionProps) => item.id}
                  renderItem={({ item }) => (
                    <TransactionCard data={item} />
                  )}
                  leftOpenValue = { 75 } 
                  rightOpenValue = { -75 } 
                />


              </TransactionsContainer>
            </>
          )
      }
    </Container>
  );
};