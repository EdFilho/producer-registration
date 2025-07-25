import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  text-align: center;
`;

export const FormSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #495057;
  margin-bottom: 4px;
  font-size: 14px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${(props) => (props.$hasError ? '#dc3545' : '#ced4da')};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? '#dc3545' : '#007bff')};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$hasError
          ? 'rgba(220, 53, 69, 0.25)'
          : 'rgba(0, 123, 255, 0.25)'};
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &.error {
    border-color: #dc3545;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

export const DynamicSection = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  background-color: #f8f9fa;
`;

export const DynamicItem = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px;
  background: white;
  border-radius: 4px;
  border: 1px solid #dee2e6;
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: fit-content;

  &:hover {
    background-color: #c82333;
  }
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 8px;

  &:hover {
    background-color: #218838;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #545b62;
  }
`;

export const AreaInfo = styled.div`
  background-color: #e9ecef;
  padding: 12px;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 14px;
  color: #495057;
`;

export const AreaWarning = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 12px;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 14px;
`;
