import React, { useState, useEffect } from 'react';
import { ProducerFormData, ESTADOS_BRASILEIROS, CULTURAS_COMUNS } from '../../../types/producer';
import { validateCPF, validateCNPJ, formatCPF, formatCNPJ } from '../../../utils/validators';
import {
  FormContainer,
  FormCard,
  FormTitle,
  FormSection,
  SectionTitle,
  FormRow,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorMessage,
  DynamicSection,
  DynamicItem,
  RemoveButton,
  AddButton,
  ButtonContainer,
  SubmitButton,
  CancelButton,
  AreaInfo,
  AreaWarning
} from './ProducerForm.styled';

interface ProducerFormProps {
  onSubmit: (data: ProducerFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ProducerFormData>;
  isLoading?: boolean;
}

const ProducerForm: React.FC<ProducerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ProducerFormData>({
    cpfCnpj: '',
    nomeProdutor: '',
    nomeFazenda: '',
    cidade: '',
    estado: '',
    areaTotalHectares: '',
    areaAgricultavelHectares: '',
    areaVegetacaoHectares: '',
    safras: [],
    culturas: [],
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para validar CPF/CNPJ
  const validateCpfCnpj = (value: string): boolean => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length === 11) {
      return validateCPF(cleanValue);
    } else if (cleanValue.length === 14) {
      return validateCNPJ(cleanValue);
    }
    return false;
  };

  // Função para formatar CPF/CNPJ
  const formatCpfCnpj = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length <= 11) {
      return formatCPF(cleanValue);
    } else {
      return formatCNPJ(cleanValue);
    }
  };

  // Validação dos campos
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // CPF/CNPJ
    if (!formData.cpfCnpj) {
      newErrors.cpfCnpj = 'CPF ou CNPJ é obrigatório';
    } else if (!validateCpfCnpj(formData.cpfCnpj)) {
      newErrors.cpfCnpj = 'CPF ou CNPJ inválido';
    }

    // Nome do produtor
    if (!formData.nomeProdutor.trim()) {
      newErrors.nomeProdutor = 'Nome do produtor é obrigatório';
    }

    // Nome da fazenda
    if (!formData.nomeFazenda.trim()) {
      newErrors.nomeFazenda = 'Nome da fazenda é obrigatório';
    }

    // Cidade
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    // Estado
    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    // Áreas
    const areaTotal = parseFloat(formData.areaTotalHectares);
    const areaAgricultavel = parseFloat(formData.areaAgricultavelHectares);
    const areaVegetacao = parseFloat(formData.areaVegetacaoHectares);

    if (!formData.areaTotalHectares || isNaN(areaTotal) || areaTotal <= 0) {
      newErrors.areaTotalHectares = 'Área total deve ser maior que zero';
    }

    if (!formData.areaAgricultavelHectares || isNaN(areaAgricultavel) || areaAgricultavel < 0) {
      newErrors.areaAgricultavelHectares = 'Área agricultável deve ser zero ou maior';
    }

    if (!formData.areaVegetacaoHectares || isNaN(areaVegetacao) || areaVegetacao < 0) {
      newErrors.areaVegetacaoHectares = 'Área de vegetação deve ser zero ou maior';
    }

    // Validação de soma das áreas
    if (!isNaN(areaTotal) && !isNaN(areaAgricultavel) && !isNaN(areaVegetacao)) {
      if (areaAgricultavel + areaVegetacao > areaTotal) {
        newErrors.areaTotal = 'A soma das áreas agricultável e vegetação não pode exceder a área total';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calcular área restante
  const getAreaRestante = (): number => {
    const areaTotal = parseFloat(formData.areaTotalHectares) || 0;
    const areaAgricultavel = parseFloat(formData.areaAgricultavelHectares) || 0;
    const areaVegetacao = parseFloat(formData.areaVegetacaoHectares) || 0;
    return areaTotal - areaAgricultavel - areaVegetacao;
  };

  // Handlers
  const handleInputChange = (field: keyof ProducerFormData, value: string) => {
    if (field === 'cpfCnpj') {
      value = formatCpfCnpj(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddSafra = () => {
    setFormData(prev => ({
      ...prev,
      safras: [...prev.safras, { ano: '', nome: '' }]
    }));
  };

  const handleRemoveSafra = (index: number) => {
    setFormData(prev => ({
      ...prev,
      safras: prev.safras.filter((_, i) => i !== index),
      // Remover também as culturas desta safra
      culturas: prev.culturas.filter(cultura => cultura.safraAno !== prev.safras[index]?.ano)
    }));
  };

  const handleSafraChange = (index: number, field: 'ano' | 'nome', value: string) => {
    setFormData(prev => {
      const newSafras = [...prev.safras];
      const oldAno = newSafras[index]?.ano;
      newSafras[index] = { ...newSafras[index], [field]: value };

      // Se mudou o ano, atualizar as culturas relacionadas
      let newCulturas = prev.culturas;
      if (field === 'ano' && oldAno !== value) {
        newCulturas = prev.culturas.map(cultura => 
          cultura.safraAno === oldAno 
            ? { ...cultura, safraAno: value }
            : cultura
        );
      }

      return {
        ...prev,
        safras: newSafras,
        culturas: newCulturas
      };
    });
  };

  const handleAddCultura = () => {
    setFormData(prev => ({
      ...prev,
      culturas: [...prev.culturas, { nome: '', safraAno: '' }]
    }));
  };

  const handleRemoveCultura = (index: number) => {
    setFormData(prev => ({
      ...prev,
      culturas: prev.culturas.filter((_, i) => i !== index)
    }));
  };

  const handleCulturaChange = (index: number, field: 'nome' | 'safraAno', value: string) => {
    setFormData(prev => {
      const newCulturas = [...prev.culturas];
      newCulturas[index] = { ...newCulturas[index], [field]: value };
      return {
        ...prev,
        culturas: newCulturas
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const areaRestante = getAreaRestante();
  const temErroArea = areaRestante < 0;

  return (
    <FormContainer>
      <FormCard>
        <FormTitle>Cadastro de Produtor Rural</FormTitle>
        
        <form onSubmit={handleSubmit}>
          {/* Dados básicos */}
          <FormSection>
            <SectionTitle>Dados do Produtor</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="cpfCnpj">CPF ou CNPJ *</Label>
                <Input
                  id="cpfCnpj"
                  type="text"
                  value={formData.cpfCnpj}
                  onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  className={errors.cpfCnpj ? 'error' : ''}
                  maxLength={18}
                />
                {errors.cpfCnpj && <ErrorMessage>{errors.cpfCnpj}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="nomeProdutor">Nome do Produtor *</Label>
                <Input
                  id="nomeProdutor"
                  type="text"
                  value={formData.nomeProdutor}
                  onChange={(e) => handleInputChange('nomeProdutor', e.target.value)}
                  placeholder="Nome completo do produtor"
                  className={errors.nomeProdutor ? 'error' : ''}
                />
                {errors.nomeProdutor && <ErrorMessage>{errors.nomeProdutor}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="nomeFazenda">Nome da Fazenda *</Label>
                <Input
                  id="nomeFazenda"
                  type="text"
                  value={formData.nomeFazenda}
                  onChange={(e) => handleInputChange('nomeFazenda', e.target.value)}
                  placeholder="Nome da propriedade"
                  className={errors.nomeFazenda ? 'error' : ''}
                />
                {errors.nomeFazenda && <ErrorMessage>{errors.nomeFazenda}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="Cidade da propriedade"
                  className={errors.cidade ? 'error' : ''}
                />
                {errors.cidade && <ErrorMessage>{errors.cidade}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className={errors.estado ? 'error' : ''}
                >
                  <option value="">Selecione o estado</option>
                  {ESTADOS_BRASILEIROS.map(estado => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </Select>
                {errors.estado && <ErrorMessage>{errors.estado}</ErrorMessage>}
              </FormGroup>
            </FormRow>
          </FormSection>

          {/* Áreas */}
          <FormSection>
            <SectionTitle>Áreas da Propriedade (em hectares)</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="areaTotalHectares">Área Total *</Label>
                <Input
                  id="areaTotalHectares"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.areaTotalHectares}
                  onChange={(e) => handleInputChange('areaTotalHectares', e.target.value)}
                  placeholder="0.00"
                  className={errors.areaTotalHectares || errors.areaTotal ? 'error' : ''}
                />
                {errors.areaTotalHectares && <ErrorMessage>{errors.areaTotalHectares}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="areaAgricultavelHectares">Área Agricultável *</Label>
                <Input
                  id="areaAgricultavelHectares"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.areaAgricultavelHectares}
                  onChange={(e) => handleInputChange('areaAgricultavelHectares', e.target.value)}
                  placeholder="0.00"
                  className={errors.areaAgricultavelHectares || errors.areaTotal ? 'error' : ''}
                />
                {errors.areaAgricultavelHectares && <ErrorMessage>{errors.areaAgricultavelHectares}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="areaVegetacaoHectares">Área de Vegetação *</Label>
                <Input
                  id="areaVegetacaoHectares"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.areaVegetacaoHectares}
                  onChange={(e) => handleInputChange('areaVegetacaoHectares', e.target.value)}
                  placeholder="0.00"
                  className={errors.areaVegetacaoHectares || errors.areaTotal ? 'error' : ''}
                />
                {errors.areaVegetacaoHectares && <ErrorMessage>{errors.areaVegetacaoHectares}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            {formData.areaTotalHectares && (
              <AreaInfo>
                <strong>Resumo das áreas:</strong><br />
                Área Total: {parseFloat(formData.areaTotalHectares || '0').toFixed(2)} ha<br />
                Área Agricultável: {parseFloat(formData.areaAgricultavelHectares || '0').toFixed(2)} ha<br />
                Área de Vegetação: {parseFloat(formData.areaVegetacaoHectares || '0').toFixed(2)} ha<br />
                Área Restante: {areaRestante.toFixed(2)} ha
              </AreaInfo>
            )}

            {errors.areaTotal && <ErrorMessage>{errors.areaTotal}</ErrorMessage>}
            {temErroArea && (
              <AreaWarning>
                ⚠️ A soma das áreas agricultável e vegetação excede a área total em {Math.abs(areaRestante).toFixed(2)} hectares.
              </AreaWarning>
            )}
          </FormSection>

          {/* Safras */}
          <FormSection>
            <SectionTitle>Safras</SectionTitle>
            <DynamicSection>
              {formData.safras.map((safra, index) => (
                <DynamicItem key={index}>
                  <FormGroup style={{ flex: 1 }}>
                    <Label>Ano da Safra</Label>
                    <Input
                      type="number"
                      min="2000"
                      max="2030"
                      value={safra.ano}
                      onChange={(e) => handleSafraChange(index, 'ano', e.target.value)}
                      placeholder="2023"
                    />
                  </FormGroup>
                  <FormGroup style={{ flex: 2 }}>
                    <Label>Nome da Safra</Label>
                    <Input
                      type="text"
                      value={safra.nome}
                      onChange={(e) => handleSafraChange(index, 'nome', e.target.value)}
                      placeholder="Safra 2023"
                    />
                  </FormGroup>
                  <RemoveButton type="button" onClick={() => handleRemoveSafra(index)}>
                    Remover
                  </RemoveButton>
                </DynamicItem>
              ))}
              <AddButton type="button" onClick={handleAddSafra}>
                + Adicionar Safra
              </AddButton>
            </DynamicSection>
          </FormSection>

          {/* Culturas */}
          <FormSection>
            <SectionTitle>Culturas Plantadas</SectionTitle>
            <DynamicSection>
              {formData.culturas.map((cultura, index) => (
                <DynamicItem key={index}>
                  <FormGroup style={{ flex: 2 }}>
                    <Label>Cultura</Label>
                    <Select
                      value={cultura.nome}
                      onChange={(e) => handleCulturaChange(index, 'nome', e.target.value)}
                    >
                      <option value="">Selecione a cultura</option>
                      {CULTURAS_COMUNS.map(culturaOption => (
                        <option key={culturaOption} value={culturaOption}>
                          {culturaOption}
                        </option>
                      ))}
                      <option value="Outro">Outro</option>
                    </Select>
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <Label>Ano da Safra</Label>
                    <Select
                      value={cultura.safraAno}
                      onChange={(e) => handleCulturaChange(index, 'safraAno', e.target.value)}
                    >
                      <option value="">Selecione a safra</option>
                      {formData.safras.map(safra => (
                        <option key={safra.ano} value={safra.ano}>
                          {safra.nome || safra.ano}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                  <RemoveButton type="button" onClick={() => handleRemoveCultura(index)}>
                    Remover
                  </RemoveButton>
                </DynamicItem>
              ))}
              <AddButton type="button" onClick={handleAddCultura}>
                + Adicionar Cultura
              </AddButton>
              {formData.safras.length === 0 && (
                <p style={{ color: '#6c757d', fontStyle: 'italic', marginTop: '8px' }}>
                  Adicione pelo menos uma safra antes de cadastrar culturas.
                </p>
              )}
            </DynamicSection>
          </FormSection>

          {/* Botões */}
          <ButtonContainer>
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Produtor'}
            </SubmitButton>
          </ButtonContainer>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default ProducerForm;
