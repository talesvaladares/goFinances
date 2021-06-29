import styled from 'styled-components/native';
// import {RectButton} from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

//botao ideal para icones e texots
export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 18px;
  
  background: ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
  align-items: center;

`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.colors.shape};
  
`;