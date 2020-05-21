import React from 'react';

import history from '~/services/history';

import Button from '~/styles/components/Button';
import { Container, Content, ErrorCode, ErrorDescription } from './styles';

export default function NoMatch() {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <ErrorDescription>
          Não encontramos a página que você solicitou. Se você tiver dúvidas,
          entre em contato conosco.
        </ErrorDescription>

        <Button size="small" onClick={() => history.goBack()}>
          Voltar
        </Button>
      </Content>
    </Container>
  );
}
