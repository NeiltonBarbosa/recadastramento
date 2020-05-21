import React from 'react';

import rondonia from '~/assets/rondonia.png';

import { Container, Content } from './styles';

export default function Footer() {
  return (
    <Container>
      <Content>
        <span>© 2020 - Governo do Estado de Rondônia</span>
        <img src={rondonia} alt="" />
      </Content>
    </Container>
  );
}
