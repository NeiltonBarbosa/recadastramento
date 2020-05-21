import React from 'react';

import { Container, Content, SUPER, SEFIN, Logo } from './styles';

import logo from '~/assets/logo-sefin.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <SUPER>
          <span>Superitendência</span>
          <span>Estadual de Contabilidade</span>
        </SUPER>
        <Logo src={logo} width={48} />
        <SEFIN>
          <span>Secretaria de</span>
          <span>Estado de Finanças</span>
        </SEFIN>
      </Content>
    </Container>
  );
}
