import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { label, ...rest } = props;
  const switchId = `switch-${uuidv4()}`;

  return (
    <Container>
      {label && <StyledLabel>{label}</StyledLabel>}
      <CheckBox id={switchId} type="checkbox" ref={ref} {...rest} />
      <SwitchLabel htmlFor={switchId}>
        <span></span>
      </SwitchLabel>
    </Container>
  );
});

Switch.displayName = 'CustomSwitch';

const Container = styled.div``;

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  color: ${({ theme }) => theme.color.textPrimary};
`;

const SwitchLabel = styled.label`
  position: relative;
  display: block;
  width: 40px;
  height: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);

  &::before {
    content: '';
    position: relative;
    top: 3px;
    left: 3px;
    width: 34px;
    height: 14px;
    display: block;
    background-color: #9a9999;
    border-radius: 8px;
    transition: background-color 0.2s linear;
  }

  & span {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    display: block;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
    transition: all 0.2s linear;

    &::before {
      content: '';
      position: absolute;
      display: block;
      margin: -18px;
      width: 56px;
      height: 56px;
      background-color: ${({ theme }) => theme.color.primary};
      border-radius: 50%;
      transform: scale(0);
      opacity: 1;
      pointer-events: none;
    }
  }
`;

const CheckBox = styled.input`
  visibility: hidden;
  display: none;

  &:checked {
    & + ${SwitchLabel}::before {
      background-color: #897be7;
    }

    & + ${SwitchLabel} span {
      background-color: ${({ theme }) => theme.color.primary};
      transform: translateX(20px);
      transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25),
        background-color 0.15s linear;
      box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
    }

    & + ${SwitchLabel} span::before {
      transform: scale(1);
      opacity: 0;
      transition: all 0.4s linear;
    }
  }
`;

export default Switch;
