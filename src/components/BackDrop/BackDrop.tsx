import React from 'react';
import styled from 'styled-components';

interface BackDropProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const BackDrop = ({ onClick }: BackDropProps) => {
  return <Container onClick={onClick} />;
};

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  -webkit-tap-highlight-color: transparent;
`;

export default BackDrop;
