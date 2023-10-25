import React, { forwardRef } from 'react';
import styled from 'styled-components';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

interface SelectProps extends ReactSelectProps {
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { label, options, value, placeholder, ...rest } = props;

  return (
    <Wrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <ReactSelect
        classNamePrefix="customSelect"
        isSearchable={false}
        options={options}
        value={value}
        {...rest}
      />
    </Wrapper>
  );
});

Select.displayName = 'CustomSelect';

const Wrapper = styled.div`
  & .customSelect {
    &__control {
      width: 100%;
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
    }

    &__control--is-focused {
      border: ${({ theme }) => theme.color.primary} 1px solid !important;
      outline-color: ${({ theme }) => theme.color.primary} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => theme.color.primary};
    }

    &__value-container {
      padding: 0 0 0 0;
    }

    &__value-container--has-value {
    }

    &__single-value {
    }

    &__input-container {
      margin: 0;
      padding: 0;
    }

    &__indicators {
    }

    &__indicator-separator {
      display: none;
    }

    &__dropdown-indicator {
      padding: 0 0 0 0.5rem;
    }

    &__menu {
      margin-top: 0.25rem;
    }

    &__menu-list {
    }

    &__option {
      /* background-color: ${({ theme }) => theme.color.primary}; */
    }

    &__option--is-focused {
      background-color: ${({ theme }) => `${theme.color.primary}20`};
    }

    &__option--is-selected {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  color: ${({ theme }) => theme.color.textPrimary};
  margin-left: 0.25rem;
`;

export default Select;
