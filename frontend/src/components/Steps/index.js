import React from 'react';
import PropTypes from 'prop-types';

import { Container, Step } from './styles';

export default function Steps({ steps }) {
  return (
    <Container>
      {steps.map(step => (
        <Step key={step.index}>
          <span>{step.title}</span>
        </Step>
      ))}
    </Container>
  );
}

Steps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};
