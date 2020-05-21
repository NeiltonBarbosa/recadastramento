export const orgaos = [
  { value: 'SSP', label: 'SSP - Secretaria de Segurança Publica' },
  { value: 'PM', label: 'PM - Polícia Militar' },
  { value: 'PC', label: 'PC - Policia Civil' },
  { value: 'CNT', label: 'CNT - Carteira Nacional de Habilitação' },
  { value: 'DIC', label: 'DIC - Diretoria de Identificação Civil' },
  { value: 'CTPS', label: 'CTPS - Carteira de Trabaho e Previdência Social' },
  { value: 'IFP', label: 'IFP - Instituto Félix Pacheco' },
  { value: 'IPF', label: 'IPF - Instituto Pereira Faustino' },
  { value: 'MTE', label: 'MTE - Ministério do Trabalho e Emprego' },
  { value: 'MMA', label: 'MMA - Ministério da Marinha' },
  { value: 'MAE', label: 'MAE - Ministério da Aeronáutica' },
  { value: 'MEX', label: 'MEX - Ministério do Exército' },
  { value: 'POF', label: 'POF - Polícia Federal' },
  { value: 'POM', label: 'POM - Polícia Militar' },
  { value: 'SES', label: 'SES - Carteira de Estrangeiro' },
  { value: 'SJS', label: 'SJS - Secretaria da Justiça e Segurança' },
  {
    value: 'SJTS',
    label: 'SJTS - Secretaria da Justiça do Trabalho e Segurança',
  },
  { value: 'ZZZ', label: 'ZZZ - Outros (inclusive exterior)' },
];

export const ufs = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

export const classificacoes = [
  { value: 'EFETIVO', label: 'Efetivo' },
  { value: 'COMISSIONADO', label: 'Comissionado' },
  { value: 'ESTAGIARIO', label: 'Estagiário' },
];

export const niveisEscolares = {
  ENSINO_FUNDAMENTAL_INTERROMPIDO: {
    enum: 'ENSINO_FUNDAMENTAL_INTERROMPIDO',
    descricao: 'Ensino Fundamental (1º Grau) interrompido',
  },
  ENSINO_FUNDAMENTAL_CURSANDO: {
    enum: 'ENSINO_FUNDAMENTAL_CURSANDO',
    descricao: 'Ensino Fundamental (1º Grau) cursando',
  },
  ENSINO_FUNDAMENTAL_COMPLETO: {
    enum: 'ENSINO_FUNDAMENTAL_COMPLETO',
    descricao: 'Ensino Fundamental (1º Grau) completo',
  },
  ENSINO_MEDIO_INTERROMPIDO: {
    enum: 'ENSINO_MEDIO_INTERROMPIDO',
    descricao: 'Ensino Médio (2º Grau) interrompido',
  },
  ENSINO_MEDIO_CURSANDO: {
    enum: 'ENSINO_MEDIO_CURSANDO',
    descricao: 'Ensino Médio (2º Grau) cursando',
  },
  ENSINO_MEDIO_COMPLETO: {
    enum: 'ENSINO_MEDIO_COMPLETO',
    descricao: 'Ensino Médio (2º Grau) completo',
  },
  ENSINO_MEDIO_PROFISSIONALIZANTE_COMPLETO: {
    enum: 'ENSINO_MEDIO_PROFISSIONALIZANTE_COMPLETO',
    descricao: 'Ensino Médio (2º Grau) Prof Completo',
  },
  FORMACAO_SUPERIOR_CURSANDO: {
    enum: 'FORMACAO_SUPERIOR_CURSANDO',
    descricao: 'Formação Superior (cursando)',
  },
  FORMACAO_SUPERIOR_COMPLETA: {
    enum: 'FORMACAO_SUPERIOR_COMPLETA',
    descricao: 'Formação Superior Completa',
  },
  POS_GRADUACAO_NIVEL_ESPECIALIZACAO: {
    enum: 'POS_GRADUACAO_NIVEL_ESPECIALIZACAO',
    descricao: 'Pós-graduação no Nível Especialização',
  },
  POS_GRADUACAO_NIVEL_MESTRADO: {
    enum: 'POS_GRADUACAO_NIVEL_MESTRADO',
    descricao: 'Pós-graduação no Nível Mestrado',
  },
  POS_GRADUACAO_NIVEL_DOUTORADO: {
    enum: 'POS_GRADUACAO_NIVEL_DOUTORADO',
    descricao: 'Pós-graduação no Nível Doutorado',
  },
};
