import React from 'react'
import { FlatList } from 'react-native';
import {categories} from '../../utils/categories';

import {Button} from '../../components/Form/Button';

import {
  Container,
  CategoryCardButton,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps{
  category:Category;
  setCategory: (category: Category) => void;
  closeSelectedCategoryModal: () => void;
}

export function CategorySelectModal({category, closeSelectedCategoryModal, setCategory}: CategorySelectProps){
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        // style={{flex: 1, width: '100%'}}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <CategoryCardButton
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} color={item.color}/>
            <Name>{item.name}</Name>
          </CategoryCardButton>
        )}
        ItemSeparatorComponent={() => <Separator/>}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectedCategoryModal}
        />
      </Footer>

    </Container>
  );
};