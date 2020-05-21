import React from 'react';
import PropTypes from 'prop-types';

import DefaultHeader from '~/components/DefaultHeader';
import Banner from '~/components/Banner';
import Footer from '~/components/Footer';

import { Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <DefaultHeader />
      <Banner />
      {children}
      <Footer />
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
