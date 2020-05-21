import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import InputContainer from '~/styles/components/InputContainer';
import Button from '~/styles/components/Button';
import FeedbackError from '~/styles/components/FeedbackError';

import { Container, Form, System } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-sefin.svg';

const validationSchema = Yup.object().shape({
  login: Yup.string().required('Login obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

const initialValues = {
  login: '',
  password: '',
};

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const { getFieldProps, isValid, handleSubmit, errors, touched } = useFormik({
    validationSchema,
    initialValues,
    isInitialValid: false,
    onSubmit: values => {
      dispatch(signInRequest(values.login, values.password));
    },
  });

  const login = getFieldProps('login');
  const password = getFieldProps('password');

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <Container>
      <img src={logo} alt="" />
      <System>
        <span>Sistema de Atualização Cadastral</span>
        <span>SIAFEM</span>
      </System>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel htmlFor="login">USUÁRIO</InputLabel>
          <InputText type="text" {...login} />
          {touched.login && errors.login && (
            <FeedbackError>{errors.login}</FeedbackError>
          )}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="senha">SENHA</InputLabel>
          <InputText type="password" {...password} />
          {touched.password && errors.password && (
            <FeedbackError>{errors.password}</FeedbackError>
          )}
        </InputContainer>

        <Button type="submit" disabled={!isValid || loading}>
          {loading ? 'AGUARDE...' : 'ENTRAR'}
        </Button>

        <Link to="/">Voltar p/ Página Inicial</Link>
      </Form>
    </Container>
  );
}
