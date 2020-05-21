import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

import { Container, Content, Title, Body } from './styles';

export default function Modal({ children, title, size, closeAction }) {
  return (
    <Container>
      <Content size={size}>
        <Title>
          <span>{title}</span>

          <div onClick={() => closeAction(false)}>
            <FaTimes size={16} color="#3e3939" />
          </div>
        </Title>
        <Body>{children}</Body>
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  closeAction: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  size: 'default',
};
