import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaUniversity,
  FaCheck,
} from 'react-icons/fa';

import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from 'react-reactive-form';

import InputMask from 'react-input-mask';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import Loader from 'react-loader-spinner';

import {
  orgaos,
  ufs,
  classificacoes,
  niveisEscolares,
} from '~/services/static';
import * as EmployeeService from '~/services/employee';
import * as ExceptionService from '~/services/exception';

import Feedback from '~/components/Feedback';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import FeedbackError from '~/styles/components/FeedbackError';
import Button from '~/styles/components/Button';
import CargoSelect from '~/styles/components/CargoSelect';
import GraduationSelect from '~/styles/components/GraduationSelect';
import UgSelect from '~/styles/components/UgSelect';

import {
  Container,
  Content,
  Steps,
  StepNav,
  StepButton,
  Step,
  Icon,
  Title,
  Details,
  Detail,
  RestrictArea,
} from './styles';

const form1 = FormBuilder.group({
  cpf: [
    '',
    [
      Validators.required,
      Validators.pattern('([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})'),
    ],
  ],
  nome: [{ value: '', disabled: true }],
  email: ['', [Validators.required, Validators.email]],
  rg: ['', Validators.required],
  orgaoEmissor: ['', Validators.required],
  ufEmissor: ['', Validators.required],
  telefoneCorporativo: [
    '',
    [
      Validators.required,
      Validators.pattern(/(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/),
    ],
  ],
  telefoneCelular: [
    '',
    Validators.pattern(/(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/),
  ],
});

const form2 = FormBuilder.group({
  cep: ['', [Validators.required, Validators.pattern('([0-9]{5})-([0-9]{3})')]],
  logradouro: ['', Validators.required],
  complemento: [''],
  numero: ['', Validators.required],
  bairro: ['', Validators.required],
  localidade: ['', Validators.required],
  uf: ['', Validators.required],
});

const form3 = FormBuilder.group({
  matricula: [''],
  classificacao: ['', Validators.required],
  anoNomeacao: ['', [Validators.required, Validators.minLength(4)]],
  cargo: ['', Validators.required],
  nivelEscolar: ['', Validators.required],
  formacao: ['', Validators.required],
  unidadeGestoraOrigem: ['', Validators.required],
  unidadeGestoraAtual: ['', Validators.required],
});

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'SUPER | Recadastramento';
  }, []);

  async function handleCpf(cpf) {
    if (
      !form1.get('cpf').hasError('pattern') &&
      !form1.get('cpf').hasError('required')
    ) {
      await EmployeeService.findByCpf(cpf).then(({ data: servidor }) => {
        if (!servidor || !servidor.habilitado) {
          form1.get('cpf').setErrors({ servidorNaoHabilitado: true });
          form1.get('nome').setValue('');
          form1.get('email').setValue('');
          form3.get('matricula').setValue('');
          form3.get('classificacao').setValue('');
        } else if (servidor.atualizado) {
          form1.get('cpf').setErrors({ servidorAtualizado: true });
          form1.get('nome').setValue('');
          form1.get('email').setValue('');
          form3.get('matricula').setValue('');
          form3.get('classificacao').setValue('');
        } else {
          form1.get('nome').setValue(servidor.nome);
          form1.get('email').setValue(servidor.email);
          form3.get('matricula').setValue(servidor.matricula);
          form3.get('classificacao').setValue(servidor.classificacao);
        }
      });
    }
  }

  async function handleCep(value) {
    if (
      !form2.get('cep').hasError('pattern') &&
      !form2.get('cep').hasError('required')
    ) {
      const cep = value
        .replace('.', '')
        .replace('-', '')
        .replace('_', '');
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then(({ data: endereco }) => {
          form2.patchValue(endereco);
        });
    }
  }

  async function handleSubmit() {
    setLoading(true);

    const servidor = {
      ...form1.value,
      endereco: form2.value,
      funcional: form3.value,
    };

    await EmployeeService.update(servidor)
      .then(() => {
        form1.reset();
        form2.reset();
        form3.reset();

        setSelected(0);

        confirmAlert({
          customUI: ({ onClose }) => <Feedback onClose={onClose} />,
        });
      })
      .catch(error => ExceptionService.handle(error))
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Content>
        <Steps>
          <StepNav>
            <StepButton valid={selected > 0}>
              <Icon>
                <FaUserAlt color="#fff" size={20} />
              </Icon>
              <Title>Informações pessoais</Title>
            </StepButton>
            <StepButton valid={selected > 1}>
              <Icon>
                <FaMapMarkerAlt color="#fff" size={20} />
              </Icon>
              <Title>Endereço</Title>
            </StepButton>
            <StepButton valid={selected > 2}>
              <Icon>
                <FaUniversity color="#fff" size={20} />
              </Icon>
              <Title>Informações funcionais</Title>
            </StepButton>
            <StepButton valid={selected === 3}>
              <Icon>
                <FaCheck color="#fff" size={20} />
              </Icon>
              <Title>Confirmação</Title>
            </StepButton>
          </StepNav>

          <Step visible={selected === 0}>
            <span>Infomações pessoais</span>

            <FieldGroup
              control={form1}
              render={({ invalid }) => (
                <form>
                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>CPF *</InputLabel>
                      <FieldControl name="cpf">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputMask
                              mask="999.999.999-99"
                              {...handler()}
                              onBlur={e => {
                                handler().onBlur(e);
                                handleCpf(e.target.value);
                              }}
                            >
                              <InputText />
                            </InputMask>
                            {touched && hasError('required') && (
                              <FeedbackError>CPF obrigatório</FeedbackError>
                            )}
                            {touched && hasError('pattern') && (
                              <FeedbackError>CPF incompleto</FeedbackError>
                            )}
                            {touched && hasError('servidorNaoHabilitado') && (
                              <FeedbackError>
                                Servidor não habilitado para atualização
                              </FeedbackError>
                            )}
                            {touched && hasError('servidorAtualizado') && (
                              <FeedbackError>
                                Servidor já realizou atualização
                              </FeedbackError>
                            )}
                            {touched && hasError('semConexao') && (
                              <FeedbackError>
                                Servidor já realizou atualização
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-8 col-sm-12">
                      <InputLabel>NOME</InputLabel>
                      <FieldControl name="nome">
                        {({ handler }) => <InputText {...handler()} />}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>RG *</InputLabel>
                      <FieldControl name="rg">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="20" />
                            {touched && hasError('required') && (
                              <FeedbackError>RG obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>EMISSOR *</InputLabel>
                      <FieldControl name="orgaoEmissor">
                        {({ handler, touched, hasError }) => (
                          <>
                            <select className="select-css" {...handler()}>
                              <option value="">Selecione</option>
                              {orgaos.map(orgao => (
                                <option key={orgao.value} value={orgao.value}>
                                  {orgao.label}
                                </option>
                              ))}
                            </select>
                            {touched && hasError('required') && (
                              <FeedbackError>Emissor obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>UF *</InputLabel>
                      <FieldControl name="ufEmissor">
                        {({ handler, touched, hasError }) => (
                          <>
                            <select className="select-css" {...handler()}>
                              <option value="">Selecione</option>
                              {ufs.map(uf => (
                                <option key={uf.value} value={uf.value}>
                                  {uf.label}
                                </option>
                              ))}
                            </select>
                            {touched && hasError('required') && (
                              <FeedbackError>UF obrigatória</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>E-MAIL *</InputLabel>
                      <FieldControl name="email">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="50" />
                            {touched && hasError('required') && (
                              <FeedbackError>E-mail obrigatório</FeedbackError>
                            )}
                            {touched && hasError('email') && (
                              <FeedbackError>E-mail inválido</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>TEL. CORPORATIVO *</InputLabel>
                      <FieldControl name="telefoneCorporativo">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputMask mask="(99) 9999-9999" {...handler()}>
                              <InputText />
                            </InputMask>
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Tel. corporativo obrigatório
                              </FeedbackError>
                            )}
                            {touched && hasError('pattern') && (
                              <FeedbackError>
                                Tel. corporativo inválido
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>TEL. CELULAR</InputLabel>
                      <FieldControl name="telefoneCelular">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputMask mask="(99) 99999-9999" {...handler()}>
                              <InputText />
                            </InputMask>
                            {touched && hasError('pattern') && (
                              <FeedbackError>
                                Tel. celular inválido
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => setSelected(1)}
                      disabled={invalid}
                    >
                      PRÓXIMO
                    </Button>
                  </div>
                </form>
              )}
            />
          </Step>

          <Step visible={selected === 1}>
            <span>Endereço</span>

            <FieldGroup
              control={form2}
              render={({ invalid }) => (
                <form>
                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>CEP *</InputLabel>
                      <FieldControl name="cep">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputMask
                              mask="99999-999"
                              {...handler()}
                              onBlur={e => {
                                handler().onBlur(e);
                                handleCep(e.target.value);
                              }}
                            >
                              <InputText />
                            </InputMask>
                            {touched && hasError('required') && (
                              <FeedbackError>CEP obrigatório</FeedbackError>
                            )}
                            {touched && hasError('pattern') && (
                              <FeedbackError>CEP inválido</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-8 col-sm-12">
                      <InputLabel>LOGRADOURO *</InputLabel>
                      <FieldControl name="logradouro">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="50" />
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Logradouro obrigatório
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>Nº *</InputLabel>
                      <FieldControl name="numero">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="10" />
                            {touched && hasError('required') && (
                              <FeedbackError>Nº obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>COMPLEMENTO</InputLabel>
                      <FieldControl name="complemento">
                        {({ handler }) => (
                          <>
                            <InputText {...handler()} maxLength="30" />
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>BAIRRO *</InputLabel>
                      <FieldControl name="bairro">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="50" />
                            {touched && hasError('required') && (
                              <FeedbackError>Bairro obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>CIDADE *</InputLabel>
                      <FieldControl name="localidade">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="50" />
                            {touched && hasError('required') && (
                              <FeedbackError>Cidade obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>UF *</InputLabel>
                      <FieldControl name="uf">
                        {({ handler, touched, hasError }) => (
                          <>
                            <select className="select-css" {...handler()}>
                              <option value="">Selecione</option>
                              {ufs.map(uf => (
                                <option key={uf.value} value={uf.value}>
                                  {uf.label}
                                </option>
                              ))}
                            </select>
                            {touched && hasError('required') && (
                              <FeedbackError>UF obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      type="button"
                      style={{ marginRight: 8 }}
                      size="small"
                      color="#888"
                      onClick={() => setSelected(0)}
                    >
                      ANTERIOR
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => setSelected(2)}
                      disabled={invalid}
                    >
                      PRÓXIMO
                    </Button>
                  </div>
                </form>
              )}
            />
          </Step>

          <Step visible={selected === 2}>
            <span>Infomações funcionais</span>

            <FieldGroup
              control={form3}
              render={({ invalid }) => (
                <form>
                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>MATRICULA</InputLabel>
                      <FieldControl name="matricula">
                        {({ handler }) => (
                          <InputText {...handler()} maxLength="9" />
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>CLASSIFICAÇÃO *</InputLabel>
                      <FieldControl name="classificacao">
                        {({ handler, touched, hasError }) => (
                          <>
                            <select className="select-css" {...handler()}>
                              <option value="">Selecione</option>
                              {classificacoes.map(classificao => (
                                <option
                                  key={classificao.value}
                                  value={classificao.value}
                                >
                                  {classificao.label}
                                </option>
                              ))}
                            </select>
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Classificação obrigatória
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>ANO NOMEAÇÃO *</InputLabel>
                      <FieldControl name="anoNomeacao">
                        {({ handler, touched, hasError }) => (
                          <>
                            <InputText {...handler()} maxLength="4" />
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Ano de nomeação obrigatório
                              </FeedbackError>
                            )}
                            {touched && hasError('minLength') && (
                              <FeedbackError>
                                Ano de nomeação inválido
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>CARGO *</InputLabel>
                      <FieldControl
                        name="cargo"
                        render={({ handler, touched, hasError }) => (
                          <>
                            <CargoSelect {...handler()} />
                            {touched && hasError('required') && (
                              <FeedbackError>Cargo obrigatório</FeedbackError>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>NÍVEL ESCOLAR</InputLabel>
                      <FieldControl name="nivelEscolar">
                        {({ handler, touched, hasError }) => (
                          <>
                            <select className="select-css" {...handler()}>
                              <option value="">Selecione</option>
                              {Object.entries(niveisEscolares).map(
                                ([key, value]) => (
                                  <option key={key} value={value.enum}>
                                    {value.descricao}
                                  </option>
                                )
                              )}
                            </select>
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Nível escolar obrigatório
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>FORMAÇÃO *</InputLabel>
                      <FieldControl name="formacao">
                        {({ handler, touched, hasError }) => (
                          <>
                            <GraduationSelect {...handler()} />
                            {touched && hasError('required') && (
                              <FeedbackError>
                                Formação obrigatório
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                      <InputLabel>UG ORIGEM *</InputLabel>
                      <FieldControl name="unidadeGestoraOrigem">
                        {({ handler, touched, hasError }) => (
                          <>
                            <UgSelect {...handler()} />
                            {touched && hasError('required') && (
                              <FeedbackError>
                                UG origem obrigatória
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <InputLabel>UG ATUAL *</InputLabel>
                      <FieldControl name="unidadeGestoraAtual">
                        {({ handler, touched, hasError }) => (
                          <>
                            <UgSelect {...handler()} />
                            {touched && hasError('required') && (
                              <FeedbackError>
                                UG atual obrigatória
                              </FeedbackError>
                            )}
                          </>
                        )}
                      </FieldControl>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Button
                      type="button"
                      style={{ marginRight: 8 }}
                      size="small"
                      color="#888"
                      onClick={() => setSelected(1)}
                    >
                      ANTERIOR
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => setSelected(3)}
                      disabled={invalid}
                    >
                      PRÓXIMO
                    </Button>
                  </div>
                </form>
              )}
            />
          </Step>

          <Step visible={selected === 3}>
            <span>Confirmação</span>

            <Details>
              <Detail>
                <div className="row">
                  <div className="col-md-4">
                    <span>CPF</span>
                    <p>{form1.get('cpf').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>NOME</span>
                    <p>{form1.get('nome').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>RG</span>
                    <p>{`${form1.get('rg').value} ${
                      form1.get('orgaoEmissor').value
                    }/${form1.get('ufEmissor').value}`}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <span>E-MAIL</span>
                    <p>{form1.get('email').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>TEL. CORPORATIVO</span>
                    <p>{form1.get('telefoneCorporativo').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>TEL. CELULAR</span>
                    <p>{form1.get('telefoneCelular').value}</p>
                  </div>
                </div>
              </Detail>

              <Detail>
                <div className="row">
                  <div className="col-md-6">
                    <span>LOGRADOURO</span>
                    <p>{form2.get('logradouro').value}</p>
                  </div>

                  <div className="col-md-2">
                    <span>Nº</span>
                    <p>{form2.get('numero').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>COMPLEMENTO</span>
                    <p>{form2.get('complemento').value}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <span>CEP</span>
                    <p>{form2.get('cep').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>BAIRRO</span>
                    <p>{form2.get('bairro').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>CIDADE/UF</span>
                    <p>{`${form2.get('localidade').value}/${
                      form2.get('uf').value
                    }`}</p>
                  </div>
                </div>
              </Detail>

              <Detail>
                <div className="row">
                  <div className="col-md-4">
                    <span>MATRICULA</span>
                    <p>{form3.get('matricula').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>CLASSIFICAÇÃO</span>
                    <p>{form3.get('classificacao').value}</p>
                  </div>

                  <div className="col-md-4">
                    <span>ANO NOMEAÇÃO</span>
                    <p>{form3.get('anoNomeacao').value}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <span>CARGO</span>
                    <p>
                      {form3.get('cargo').value &&
                        form3.get('cargo').value.nome}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <span>NÍVEL ESCOLAR</span>
                    <p>
                      {form3.get('nivelEscolar').value &&
                        niveisEscolares[form3.get('nivelEscolar').value]
                          .descricao}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <span>FORMAÇÃO</span>
                    <p>
                      {form3.get('formacao').value &&
                        form3.get('formacao').value.nome}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <span>UG ORIGEM</span>
                    <p>
                      {form3.get('unidadeGestoraOrigem').value &&
                        `${
                          form3.get('unidadeGestoraOrigem').value.codigoUg
                        } - ${form3.get('unidadeGestoraOrigem').value.nome}`}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <span>UG ATUAL</span>
                    <p>
                      {form3.get('unidadeGestoraAtual').value &&
                        `${form3.get('unidadeGestoraAtual').value.codigoUg} - ${
                          form3.get('unidadeGestoraAtual').value.nome
                        }`}
                    </p>
                  </div>
                </div>
              </Detail>

              <div
                style={{
                  textAlign: 'right',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="button"
                  style={{ marginRight: 8 }}
                  size="small"
                  color="#888"
                  onClick={() => setSelected(2)}
                >
                  ANTERIOR
                </Button>
                <Button
                  type="button"
                  size="small"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Loader type="Watch" color="#FFF" height={24} width={24} />
                  ) : (
                    'FINALIZAR'
                  )}
                </Button>
              </div>
            </Details>
          </Step>
        </Steps>

        <RestrictArea>
          <Link to="/login">Acesso Restrito</Link>
        </RestrictArea>
      </Content>
    </Container>
  );
}
