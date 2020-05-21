import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, Message, Actions } from './styles';

export default function Feedback({ onClose }) {
  return (
    <Container>
      <Title>Deu tudo certo!</Title>
      <Message>
        Em breve você receberá um e-mail com todos os detalhes deste processo.
      </Message>

      <Actions>
        <button type="button" onClick={onClose}>
          OK
        </button>
      </Actions>
    </Container>
  );
}

Feedback.propTypes = {
  onClose: PropTypes.func.isRequired,
};
