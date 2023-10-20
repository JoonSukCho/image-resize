import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...rest } = props;
  const inputId = `input-${uuidv4()}`;

  return (
    <Container>
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
      <StyledInput id={inputId} ref={ref} {...rest} />
    </Container>
  );
});

Input.displayName = 'CustomInput';

const Container = styled.div``;

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.color.textPrimary};
  margin-left: 0.25rem;
`;

const StyledInput = styled.input`
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d2d6da;
  appearance: none;
  border-radius: 0.5rem;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;

  &:focus {
    border: ${({ theme }) => theme.color.primary} 1px solid !important;
    outline: none;
  }
`;

export default Input;
