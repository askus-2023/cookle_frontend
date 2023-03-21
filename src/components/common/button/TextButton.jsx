import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/Theme';

const TextButton = ({ type, children, onClick }) => {
  return (
    <Wrapper>
      <button type={type ?? 'button'} onClick={onClick}>
        {children}
      </button>
    </Wrapper>
  );
};

export default TextButton;

const Wrapper = styled.div`
  border: none;
  border-radius: 6px;
  display: flex;
  flex-shrink: 0;

  button {
    padding: 12px 15px;
    color: ${theme.colors.green50};
    font-size: 16px;
    font-weight: bold;
    &:hover {
      border-radius: 6px;
      background-color: ${theme.colors.green10};
    }
  }
`;