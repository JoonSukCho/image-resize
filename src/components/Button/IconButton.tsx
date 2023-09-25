import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const IconButton = ({
  color,
  backgroundColor,
  children,
  ...rest
}: IconButtonProps) => {
  return (
    <ButtonContainer color={color} backgroundColor={backgroundColor} {...rest}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  color?: string;
  backgroundColor?: string;
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

  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.color.secondary};
  color: ${({ color }) => (color ? color : '#ffffff')};

  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default IconButton;
