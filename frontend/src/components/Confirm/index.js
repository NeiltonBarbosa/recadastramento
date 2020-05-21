import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, Message, Actions } from './styles';

export default function Confirm({ onClose, onConfirm, params }) {
  function handleConfirm() {
    onConfirm(params);
    onClose();
  }

  return (
    <Container>
      <Title>Confirmação</Title>
      <Message>Você tem certeza disso?</Message>

      <Actions>
        <button type="button" onClick={handleConfirm}>
          Sim
        </button>
        <button type="button" onClick={onClose}>
          Não
        </button>
      </Actions>
    </Container>
  );
}

Confirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  params: PropTypes.number.isRequired,
};
