import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList} from 'react-native';
import {TransactionProps} from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background: ${({theme}) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  /* essa função getStatusBarHeight é usada pra dar o espaçado no iphone da topBarStatus */
  margin-top: ${getStatusBarHeight() +  RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

//botão usado para icones
export const LogoutButton = styled(BorderlessButton)`

`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;

`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular} ;
`;

export const UserName = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold} ;
`;

export const Icon = styled(Feather)`

  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;

`;

export const HighlightCardsList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle:{paddingHorizontal: 24}
})`

  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
  
`;

export const TransactionsContainer = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;

`;
// este componente foi sobrescrito
// informando que a lista que ele recebe é a DataListProps
//o attrs são atributos do componente que tambem poderiam ser usados diretamente nele
//exemplo
// <Flatlist
//  showsVerticalScrollIndicator={false}
// />
export const TransactionsList = styled(
  FlatList as new () => FlatList<TransactionProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle:{
    paddingBottom: getBottomSpace()
  }
})`
  
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  margin-bottom: 16px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

