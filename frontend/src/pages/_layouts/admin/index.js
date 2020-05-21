import React from 'react';
import PropTypes from 'prop-types';

import Nav from '~/components/Nav';
import Header from '~/components/Header';

import { Container, Content } from './styles';

export default function AdminLayout({ children }) {
  return (
    <Container>
      <Nav />

      <Content>
        <Header />
        {children}
      </Content>
    </Container>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
