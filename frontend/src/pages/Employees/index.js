import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';

import * as EmployeeService from '~/services/employee';
import * as UgService from '~/services/ug';
import * as ExceptionService from '~/services/exception';
import { hasRole } from '~/services/security';

import Modal from '~/components/Modal';
import Card from '~/components/Card';
import Confirm from '~/components/Confirm';
import InputGroup from '~/styles/components/InputGroup';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import InputSelect from '~/styles/components/InputSelect';
import Button from '~/styles/components/Button';
import FeedbackError from '~/styles/components/FeedbackError';

import {
  Container,
  New,
  Message,
  List,
  EmployeesList,
  Employee,
  Name,
  Info,
  Cpf,
  Ug,
  Status,
  EmployeeDetails,
  Trash,
} from './styles';

const validationSchema = yup.object().shape({
  cpf: yup.string().required('CPF obrigatório'),
  nome: yup.string().required('Nome obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
});

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [ugs, setUgs] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({
    show: false,
    message: '',
  });
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState({
    page: 0,
    cpf: '',
    nome: '',
    unidadesGestoras: [],
    size: 10,
  });

  const {
    register,
    errors,
    setValue,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    validationSchema,
  });

  useEffect(() => {
    async function loadServidores() {
      const data = await EmployeeService.find(filter);

      setEmployees(data.servidores);
      setPageCount(data.pageCount);
    }

    loadServidores();
  }, [filter]);

  useEffect(() => {
    document.title = 'Servidores';

    async function loadUgs() {
      const { data } = await UgService.list();

      setUgs(
        data.map(ug => ({
          value: ug.codigo,
          label: `${ug.codigoUg} - ${ug.nome}`,
        }))
      );
    }

    loadUgs();
  }, []);

  async function onSubmit(data) {
    const obj = {
      ...data,
      unidadeGestora: {
        codigo: data.unidade_gestora,
      },
    };

    const { data: servidor } = await EmployeeService.store(obj).catch(error =>
      ExceptionService.handle(error)
    );

    setFilter({
      nome: servidor.nome,
      page: 0,
    });

    reset({
      cpf: '',
      matricula: '',
      nome: '',
      email: '',
      unidade_gestora: '',
    });

    toast.success('Servidor habilitado com sucesso!');
  }

  async function handleCpf(cpf) {
    setMessage({ show: false, message: '' });
    if (cpf) {
      const { data: servidor } = await EmployeeService.findByCpf(cpf);

      if (servidor.habilitado) {
        setMessage({
          show: true,
          message:
            'Caro usuário, o CPF informado já consta habilitado no processo de Recadastramento, sendo desnecessário uma nova habilitação.',
        });
      } else {
        setValue('matricula', servidor.matricula);
        setValue('nome', servidor.nome);
      }
    } else {
      setValue('matricula', '');
      setValue('nome', '');
    }
  }

  async function onDelete(codigo) {
    await EmployeeService.remove(codigo)
      .then(() => {
        toast.success('Servidor excluído com sucesso!');
        setEmployees(employees.filter(s => s.codigo !== codigo));
      })
      .catch(error => ExceptionService.handle(error));
  }

  async function handleDelete(event, codigo) {
    event.stopPropagation();

    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm
          onClose={onClose}
          onDelete={onDelete}
          onConfirm={onDelete}
          params={codigo}
        />
      ),
    });
  }

  function showModal(servidor) {
    servidor = {
      ...servidor,
      dataHabilicacaoFormatada: format(
        parseISO(servidor.dataHabilitacao),
        'dd/MM/yyyy'
      ),
      dataHoraAtualizacaoFormatada:
        servidor.dataHoraAtualizacao &&
        format(parseISO(servidor.dataHoraAtualizacao), 'dd/MM/yyyy HH:mm'),
    };

    setModal(true);
    setEmployeeSelected(servidor);
  }

  return (
    <Container>
      <New>
        <Card title="Cadastro">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Message show={message.show}>
              <span>{message.message}</span>
            </Message>

            <InputGroup columns="2">
              <InputContainer>
                <InputLabel>CPF *</InputLabel>
                <InputMask
                  mask="999.999.999-99"
                  onBlur={event => handleCpf(event.target.value)}
                >
                  <InputText name="cpf" ref={register} />
                </InputMask>
                {errors.cpf && (
                  <FeedbackError>{errors.cpf.message}</FeedbackError>
                )}
              </InputContainer>
              <InputContainer>
                <InputLabel>MATRICULA</InputLabel>
                <InputText name="matricula" ref={register} maxLength="9" />
              </InputContainer>
            </InputGroup>

            <InputContainer>
              <InputLabel>NOME *</InputLabel>
              <InputText name="nome" ref={register} />
              {errors.nome && (
                <FeedbackError>{errors.nome.message}</FeedbackError>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>EMAIL *</InputLabel>
              <InputText name="email" ref={register} />
              {errors.email && (
                <FeedbackError>{errors.email.message}</FeedbackError>
              )}
            </InputContainer>

            {hasRole('ROLE_GERENCIAR_TODO_SERVIDOR') && (
              <InputContainer>
                <InputLabel>UG *</InputLabel>
                <select
                  className="select-css"
                  name="unidade_gestora"
                  ref={register}
                >
                  <option value="">Selecione</option>
                  {ugs.map(ug => (
                    <option key={ug.value} value={ug.value}>
                      {ug.label}
                    </option>
                  ))}
                </select>
              </InputContainer>
            )}

            <Button type="submit" disabled={!formState.isValid}>
              SALVAR
            </Button>
          </form>
        </Card>
      </New>
      <List>
        <Card title="Pesquisa">
          <form>
            <InputGroup columns="2">
              <InputContainer>
                <InputLabel>CPF</InputLabel>
                <InputMask
                  mask="999.999.999-99"
                  maskChar="  "
                  onChange={e => {
                    setFilter({
                      ...filter,
                      page: 0,
                      cpf: e.target.value,
                    });
                  }}
                >
                  <InputText />
                </InputMask>
              </InputContainer>
              <InputContainer>
                <InputLabel>NOME</InputLabel>
                <InputText
                  onChange={e => {
                    setFilter({
                      ...filter,
                      page: 0,
                      nome: e.target.value,
                    });
                  }}
                />
              </InputContainer>
            </InputGroup>

            <InputContainer>
              <InputLabel>UG</InputLabel>
              <InputSelect
                isMulti
                options={ugs}
                onChange={selecteds => {
                  setFilter({
                    ...filter,
                    unidadesGestoras: selecteds && selecteds.map(s => s.value),
                  });
                }}
              />
            </InputContainer>
          </form>

          {employees.length > 0 ? (
            <>
              <EmployeesList>
                {employees.map(servidor => (
                  <Employee
                    key={servidor.codigo}
                    onClick={() => showModal(servidor)}
                  >
                    <Name>{servidor.nome}</Name>

                    <Info>
                      <Cpf>{servidor.cpf}</Cpf>
                      <Ug>{servidor.unidadeGestora.codigoUg}</Ug>
                      {servidor.atualizado && <Status>ATUALIZADO</Status>}
                      {!servidor.atualizado && (
                        <Trash
                          onClick={event =>
                            handleDelete(event, servidor.codigo)
                          }
                        >
                          <FaTrashAlt size={16} color="#ca3e47" />
                        </Trash>
                      )}
                    </Info>
                  </Employee>
                ))}
              </EmployeesList>

              <ReactPaginate
                forcePage={filter.page}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                previousLabel="◀"
                nextLabel="▶"
                breakLabel="..."
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="activ"
                onPageChange={({ selected }) =>
                  setFilter({
                    ...filter,
                    page: selected,
                  })
                }
              />
            </>
          ) : (
            <p className="empty">Nenhum servidor encontrado.</p>
          )}
        </Card>
      </List>

      {modal && (
        <Modal title={employeeSelected.nome} size="big" closeAction={setModal}>
          <EmployeeDetails>
            <div>
              <label htmlFor="nome">NOME</label>
              <span id="nome">{employeeSelected.nome}</span>
            </div>
          </EmployeeDetails>

          <EmployeeDetails columns="3">
            <div>
              <label htmlFor="cpf">CPF</label>
              <span id="cpf">{employeeSelected.cpf}</span>
            </div>
            <div>
              <label htmlFor="nome">MATRICULA</label>
              <span id="nome">{employeeSelected.matricula}</span>
            </div>

            <div>
              <label htmlFor="email">E-MAIL</label>
              <span id="email">{employeeSelected.email}</span>
            </div>
          </EmployeeDetails>

          <EmployeeDetails>
            <div>
              <label htmlFor="ug">UG</label>
              <span id="ug">
                {employeeSelected.unidadeGestora.codigoUg} -{' '}
                {employeeSelected.unidadeGestora.nome}
              </span>
            </div>
          </EmployeeDetails>

          <EmployeeDetails columns="2">
            <div>
              <label htmlFor="habilitado">HABILITADO</label>
              <span id="habilitado">
                {employeeSelected.dataHabilicacaoFormatada}
              </span>
            </div>

            <div>
              <label htmlFor="atualizado">ATUALIZADO</label>
              <span id="atualizado">
                {employeeSelected.dataHoraAtualizacaoFormatada}
              </span>
            </div>
          </EmployeeDetails>
        </Modal>
      )}
    </Container>
  );
}
