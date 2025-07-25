import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e9ecef;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ModalIcon = styled.div<{ variant: 'danger' | 'warning' | 'info' }>`
  font-size: 48px;
  margin-bottom: 16px;
  ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return 'filter: hue-rotate(0deg);';
      case 'warning':
        return 'filter: hue-rotate(45deg);';
      case 'info':
        return 'filter: hue-rotate(200deg);';
      default:
        return '';
    }
  }}
`;

export const ModalMessage = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  white-space: pre-line;

  strong {
    color: #333;
    font-weight: 600;
  }

  ul {
    text-align: left;
    margin: 12px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px 24px;
  justify-content: flex-end;
`;

export const ModalButton = styled.button<{
  variant: 'danger' | 'warning' | 'info' | 'secondary';
}>`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;

  ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;
          &:hover {
            background-color: #c82333;
          }
          &:active {
            background-color: #bd2130;
          }
        `;
      case 'warning':
        return `
          background-color: #ffc107;
          color: #212529;
          &:hover {
            background-color: #e0a800;
          }
          &:active {
            background-color: #d39e00;
          }
        `;
      case 'info':
        return `
          background-color: #17a2b8;
          color: white;
          &:hover {
            background-color: #138496;
          }
          &:active {
            background-color: #117a8b;
          }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover {
            background-color: #5a6268;
          }
          &:active {
            background-color: #545b62;
          }
        `;
      default:
        return `
          background-color: #007bff;
          color: white;
          &:hover {
            background-color: #0056b3;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
