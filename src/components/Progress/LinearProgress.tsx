import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface LinearProgressProps {
  value: number;
}

const LinearProgress = ({ value }: LinearProgressProps) => {
  const valueStyle: CSSProperties = {
    width: `${value}%`,
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 'inherit',
    transition: 'width 2s ease-in-out',
  };

  return (
    <Container>
      <div style={valueStyle}>{value}</div>
    </Container>
  );
};

const Container = styled.div`
  width: '100%';
  height: 8px;
  background-color: #e0e0de;
  border-radius: 4px 4px 0 0;

  color: red;
`;

export default LinearProgress;
