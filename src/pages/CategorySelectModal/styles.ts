import styled, { css } from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${({theme}) => theme.colors.primary};
  
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.shape};
`;

type CategoryProps = {
  isActive: boolean;
}

export const CategoryCardButton = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;

  ${({isActive}) => isActive && css`
    background: ${({theme}) => theme.colors.secondary_light};
  `}

`;

type IconProps = {
  color: string;
}

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({color}) => color};
`;


export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;