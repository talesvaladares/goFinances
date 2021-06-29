import React, { useDebugValue, useEffect, useState } from 'react'
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

//components
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputReactHookForm } from '../../components/InputReactHookForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectModal } from '../CategorySelectModal';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeButtonsContainer
} from './styles';

interface FormData {
  name: string;
  price: string;
}

const schema = Yup.object().shape({

  name: Yup.string().required('Nome é obrigatório'),
  price: Yup.number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required("O valor é obrigatório"),

});

export function Register() {

  //estados da aplicação
  const [typeTransactionSelected, setTypeTransactionSelected] = useState('');
  const [modalIsVisble, setModalIsVisble] = useState(false);
  const [category, setCategory] = useState({
    name: 'Categoria',
    key: 'category'
  });

  //navegação
  const {navigate} = useNavigation();

  //funçoões do react hook form
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors}

  } = useForm({
    resolver: yupResolver(schema)
  });

  //funções
  function handleTypeTransactionSelected(type: 'positive' | 'negative') {
    setTypeTransactionSelected(type);
  }

  function handleCloseSelecetCategoryModal() {
    setModalIsVisble(false);
  }

  function handleOpenSelecetCategoryModal() {
    setModalIsVisble(true);
  }

  async function handleSubmitForm(form: FormData) {

    if(!typeTransactionSelected){
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category'){
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.price,
      type: typeTransactionSelected,
      category,
      date: new Date()
    };

    console.log("salmento da categoria" + category);

    try{
      
      const dataKey = '@gofinances:transactions';

      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction

      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setTypeTransactionSelected('');
      setCategory({ name: 'Categoria',  key: 'category'});

      //reseta os campos do react hook form
      reset();

      Alert.alert("Transação cadastrada com sucesso!");
      navigate('Listagem');
      

    }
    catch(error){
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }

  }

  useEffect(() => {
    async function loadTransactions() {
      const dataKey = '@gofinances:transactions';
      const data = await AsyncStorage.getItem(dataKey);

      console.log(JSON.parse(data!));

    }
  },[]);

  return (
    //usado para fechar o teclado
    //quando clicar em qualquer outra área do app
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputReactHookForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
              
            />

            <InputReactHookForm
              name="price"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.price && errors.price.message}
             
            />

            <TransactionTypeButtonsContainer>
              <TransactionTypeButton
                title="Entrada"
                type="up"
                onPress={() => handleTypeTransactionSelected('positive')}
                isActive={typeTransactionSelected === 'positive'}
              />

              <TransactionTypeButton
                title="Saída"
                type="down"
                onPress={() => handleTypeTransactionSelected('negative')}
                isActive={typeTransactionSelected === 'negative'}

              />
            </TransactionTypeButtonsContainer>

            {/* Faz abrir um modal com as categorias */}
            <CategorySelectButton
              title={category.name}
              openCategorySelectModal={handleOpenSelecetCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleSubmitForm)}
          />

        </Form>

        <Modal visible={modalIsVisble}>
          <CategorySelectModal
            category={category}
            setCategory={setCategory}
            closeSelectedCategoryModal={handleCloseSelecetCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
};