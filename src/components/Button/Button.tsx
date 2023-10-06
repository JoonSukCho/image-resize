import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = ({ children, startIcon, endIcon, ...rest }: ButtonProps) => {
  return (
    <ButtonContainer {...rest}>
      {startIcon && <Icon iconPosition="start">{startIcon}</Icon>}
      {children}
      {endIcon && <Icon iconPosition="end">{endIcon}</Icon>}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  color?: string;
  backgroundColor?: string;
}>`
  cursor: pointer;
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  outline: 0;

  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.color.secondary};
  color: ${({ color, theme }) => (color ? color : '#ffffff')};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;

  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled.span<{ iconPosition: 'start' | 'end' }>`
  display: flex;
  margin-right: ${({ iconPosition }) => (iconPosition === 'start' ? 4 : 0)}px;
  margin-left: ${({ iconPosition }) => (iconPosition === 'end' ? 4 : 0)}px;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

export default Button;
