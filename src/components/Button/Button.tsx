import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';
import { ColorType } from 'styles/Theme.types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  children?: React.ReactNode;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = ({
  children,
  color,
  startIcon,
  endIcon,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonContainer color={color} {...rest}>
      {startIcon && <Icon iconPosition="start">{startIcon}</Icon>}
      {children}
      {endIcon && <Icon iconPosition="end">{endIcon}</Icon>}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  color?: ColorType;
}>`
  cursor: pointer;
  position: relative;

  min-width: 80px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.375rem;
  outline: 0;

  background-color: ${({ theme, color }) => theme.color[color ?? 'secondary']};
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;

  letter-spacing: 0.25px;

  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  &:disabled {
    cursor: initial;
    opacity: 0.7;
  }

  &:hover:enabled {
    opacity: 0.8;
  }
`;

const Icon = styled.span<{ iconPosition: 'start' | 'end' }>`
  display: flex;
  margin-right: ${({ iconPosition }) => (iconPosition === 'start' ? 6 : 0)}px;
  margin-left: ${({ iconPosition }) => (iconPosition === 'end' ? 6 : 0)}px;

  & svg {
    width: 18px;
    height: 18px;
  }
`;

export default Button;
