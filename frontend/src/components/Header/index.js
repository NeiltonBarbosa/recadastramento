import React from 'react';

import { Container, System } from './styles';

export default function Header() {
  return (
    <Container>
      <System>
        <p>SACS</p>
        <span>Sistema de Atualização Cadastral</span>
        <span>SIAFEM</span>
      </System>
    </Container>
  );
}
