import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outlined-danger' | 'outlined-secondary' | 'outlined-primary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const getVariantStyles = (variant: ActionButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.main};
        color: white;
        border: 2px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.dark};
          border-color: ${theme.colors.primary.dark};
          transform: translateY(-1px);
        }
      `;

    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary.main};
        color: white;
        border: 2px solid ${theme.colors.secondary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary.dark};
          border-color: ${theme.colors.secondary.dark};
          transform: translateY(-1px);
        }
      `;

    case 'danger':
      return css`
        background-color: ${theme.colors.danger.main};
        color: white;
        border: 2px solid ${theme.colors.danger.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.danger.dark};
          border-color: ${theme.colors.danger.dark};
          transform: translateY(-1px);
        }
      `;

    case 'success':
      return css`
        background-color: ${theme.colors.success.main};
        color: white;
        border: 2px solid ${theme.colors.success.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.success.dark};
          border-color: ${theme.colors.success.dark};
          transform: translateY(-1px);
        }
      `;

    case 'warning':
      return css`
        background-color: ${theme.colors.warning.main};
        color: white;
        border: 2px solid ${theme.colors.warning.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.warning.dark};
          border-color: ${theme.colors.warning.dark};
          transform: translateY(-1px);
        }
      `;

    case 'info':
      return css`
        background-color: ${theme.colors.info.main};
        color: white;
        border: 2px solid ${theme.colors.info.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.info.dark};
          border-color: ${theme.colors.info.dark};
          transform: translateY(-1px);
        }
      `;

    case 'outlined-danger':
      return css`
        background-color: transparent;
        color: ${theme.colors.danger.main};
        border: 2px solid ${theme.colors.danger.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.danger.main};
          color: white;
          transform: translateY(-1px);
        }
      `;

    case 'outlined-secondary':
      return css`
        background-color: transparent;
        color: ${theme.colors.secondary.main};
        border: 2px solid ${theme.colors.secondary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary.main};
          color: white;
          transform: translateY(-1px);
        }
      `;

    case 'outlined-primary':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary.main};
        border: 2px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.main};
          color: white;
          transform: translateY(-1px);
        }
      `;

    default:
      return css`
        background-color: ${theme.colors.primary.main};
        color: white;
        border: 2px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.dark};
          border-color: ${theme.colors.primary.dark};
          transform: translateY(-1px);
        }
      `;
  }
};

const getSizeStyles = (size: ActionButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.fontSize.sm};
        min-height: 32px;
      `;

    case 'large':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.fontSize.lg};
        min-height: 48px;
      `;

    case 'medium':
    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.fontSize.md};
        min-height: 40px;
      `;
  }
};

const StyledButton = styled.button<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: ${theme.shadows.sm};

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary.lighter}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none;
  }

  ${({ loading }) =>
    loading &&
    css`
      cursor: not-allowed;
      opacity: 0.7;
    `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ButtonContent = styled.span<{ loading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...buttonProps
}) => {
  return (
    <StyledButton
      className={className}
      variant={variant}
      size={size}
      loading={loading}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading && <LoadingSpinner />}
      <ButtonContent loading={loading}>
        {children}
      </ButtonContent>
    </StyledButton>
  );
};
