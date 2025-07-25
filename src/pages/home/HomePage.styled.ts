import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

export const HomeCard = styled.div`
  background: ${theme.colors.background.paper};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.lg};
`;

export const HomeTitle = styled.h1`
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

export const HomeDescription = styled.p`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.text.secondary};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

export const HomeButton = styled.button`
  background-color: ${theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.primary.dark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${theme.colors.grey[400]};
    cursor: not-allowed;
    transform: none;
  }
`;

export const FeaturesSection = styled.div`
  margin-top: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.grey[50]};
  border-radius: ${theme.borderRadius.lg};
`;

export const FeaturesTitle = styled.h3`
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.medium};
`;

export const FeaturesList = styled.ul`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;

  li {
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const ProducersSection = styled.div`
  margin-top: ${theme.spacing.xxl};
`;

export const ProducersTitle = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  font-weight: ${theme.fontWeight.medium};
`;

export const ProducersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

export const ProducerCard = styled.div`
  background: ${theme.colors.background.paper};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const ProducerName = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${theme.colors.primary.main};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.medium};
`;

export const ProducerInfo = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.4;

  p {
    margin: ${theme.spacing.xs} 0;
  }

  strong {
    color: ${theme.colors.text.primary};
  }
`;

export const ProducerActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border.main};
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.lg};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.danger.dark};
  background-color: ${theme.colors.danger.lighter}20;
  border: 1px solid ${theme.colors.danger.light};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
`;
