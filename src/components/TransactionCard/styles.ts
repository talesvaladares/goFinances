import styled, {css} from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

type TypeProps = {
  type: 'positive' | 'negative';
}


export const Container = styled.View`
  background: ${({theme}) => theme.colors.shape};
  border-radius: 5px;

  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`
export const Amount = styled.Text<TypeProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;

  color: ${({theme , type}) => type === 'positive' ? theme.colors.success : theme.colors.attention };

  margin-top: 2px;
`
type IconColor = {
  color: string;
}

export const Icon = styled(Feather)<IconColor>`

  color: ${({color}) => color};
  font-size: ${RFValue(20)}px;


`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`
export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};

  margin-left: 17px;
`;
export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
  
`