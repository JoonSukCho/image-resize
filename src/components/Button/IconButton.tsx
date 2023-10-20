import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';
import { ColorType } from 'styles/Theme.types';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  children: React.ReactNode;
}

const IconButton = ({ color, children, ...rest }: IconButtonProps) => {
  return (
    <ButtonContainer color={color} {...rest}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  color?: ColorType;
}>`
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  outline: 0;
  line-height: 1.5;

  background-color: ${({ theme, color }) => theme.color[color ?? 'primary']};
  color: #ffffff;

  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default IconButton;
