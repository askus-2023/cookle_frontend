import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';

const Tag = ({ className, type, hash, children }) => {
  return (
    <Wrapper className={className} type={type}>
      <div className='tag-container'>
        <span className='tag-hash'>{hash ? '# ' : ''}</span>
        <span className='tag-name'>{children}</span>
      </div>
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.div`
  padding: 0 0.4rem;
  margin-bottom: 0.8rem;
  display: inline-block;
  .tag-container {
    width: fit-content;
    padding: 0.2rem 1.2rem;
    background-color: white;
    border-radius: 2.4rem;
    border: ${({ type }) =>
      type === 'outline' ? `0.1rem solid ${theme.colors.grey90}` : 'none'};
  }
  .tag-hash {
    font-size: 1.4rem;
  }
  .tag-name {
    font-size: 1.4rem;
    line-height: 1.6;
  }
`;
