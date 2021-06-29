import React from 'react'
import {TouchableOpacityProps} from 'react-native';
// import {RectButtonProps} from 'react-native-gesture-handler';

import {
  Container,
  Title
} from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
}

export function Button({title, onPress, ...rest}: ButtonProps ){
  return (
    <Container onPress={onPress} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
};