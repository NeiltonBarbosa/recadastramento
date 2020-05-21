import React from 'react';

import history from '~/services/history';

import Button from '~/styles/components/Button';
import { Container, Content, ErrorCode, ErrorDescription } from './styles';

export default function Forbbiden() {
  return (
    <Container>
      <Content>
        <ErrorCode>403</ErrorCode>
        <ErrorDescription>
          Você não tem permissão para acessar página solicitada. Se você tiver
          dúvidas, entre em contato conosco.
        </ErrorDescription>

        <Button size="small" onClick={() => history.goBack()}>
          Voltar
        </Button>
      </Content>
    </Container>
  );
}
