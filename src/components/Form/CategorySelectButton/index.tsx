import React from 'react'
import {TouchableOpacityProps} from 'react-native';

import {
  Container,
  Category,
  Icon
} from './styles';

type CategorySelectProps =  {
  title: string;
  openCategorySelectModal: () => void;
};

export function CategorySelectButton({title, openCategorySelectModal}: CategorySelectProps){
  return (
    <Container onPress={openCategorySelectModal}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>
    </Container>
  );
};