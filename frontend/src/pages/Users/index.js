import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { confirmAlert } from 'react-confirm-alert';

import * as UserService from '~/services/user';
import * as UgService from '~/services/ug';
import * as GroupService from '~/services/group';
import * as ExceptionService from '~/services/exception';

import Card from '~/components/Card';
import Confirm from '~/components/Confirm';

import InputGroup from '~/styles/components/InputGroup';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import FeedbackError from '~/styles/components/FeedbackError';
import Button from '~/styles/components/Button';
import { Table, Actions } from '~/styles/components/Table';

import { Container, New, List } from './styles';

const validationSchema = yup.object().shape({
  login: yup.string().required('LOGIN obrigatório'),
  unidadeGestora: yup.string().required('UG obrigatória'),
  senha: yup.string(),
  confirmacaoSenha: yup
    .mixed()
    .oneOf([yup.ref('senha')], 'Senhas não conferem'),
  grupos: yup.string().required('Grupo obrigatório'),
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [ugs, setUgs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ativo, setAtivo] = useState(true);

  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState({
    page: 0,
    login: '',
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
    async function loadUsers() {
      const data = await UserService.find(filter);

      setUsers(data.users);
      setPageCount(data.pageCount);
    }

    loadUsers();
  }, [filter]);

  useEffect(() => {
    document.title = 'Usuários';

    async function loadUgs() {
      const { data } = await UgService.list();

      setUgs(data);
    }

    async function loadGroups() {
      const { data } = await GroupService.list();

      setGroups(
        data.map(group => ({
          value: group.codigo,
          label: group.nome,
        }))
      );
    }

    loadUgs();
    loadGroups();
  }, []);

  function onEdit(user) {
    setValue('codigo', user.codigo);
    setValue('login', user.login, true);
    setValue('unidadeGestora', user.unidadeGestora.codigo, true);
    setValue('grupos', user.grupos[0].codigo, true);
    setAtivo(user.ativo);
  }

  function resetValues() {
    reset({
      codigo: '',
      login: '',
      senha: '',
      confirmacaoSenha: '',
      unidadeGestora: '',
      grupos: '',
    });
    setAtivo(true);
  }

  async function onSubmit(data) {
    const user = {
      ...data,
      unidadeGestora: ugs.find(u => u.codigo === Number(data.unidadeGestora)),
      grupos: [{ codigo: data.grupos }],
      ativo,
    };

    if (user.codigo) {
      await UserService.update(user)
        .then(({ data: us }) => {
          toast.success('Usuário salvo com sucesso!');

          setUsers(users.map(u => (u.codigo === us.codigo ? us : u)));
          resetValues();
        })
        .catch(error => ExceptionService.handle(error));
    } else {
      await UserService.store(user)
        .then(({ data: us }) => {
          toast.success('Usuário salvo com sucesso!');

          setUsers([...users, us]);

          resetValues();
        })
        .catch(error => ExceptionService.handle(error));
    }
  }

  async function onDelete(codigo) {
    await UserService.remove(codigo)
      .then(() => {
        toast.success('Usuário excluído com sucesso!');
        setUsers(users.filter(u => u.codigo !== codigo));

        resetValues();
      })
      .catch(error => ExceptionService.handle(error));
  }

  function handleDelete(codigo) {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm onClose={onClose} onConfirm={onDelete} params={codigo} />
      ),
    });
  }

  return (
    <Container>
      <New>
        <Card title="Cadastro">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="codigo" ref={register} />

            <InputContainer>
              <InputLabel>LOGIN *</InputLabel>
              <InputText name="login" ref={register} />
              {errors.login && (
                <FeedbackError>{errors.login.message}</FeedbackError>
              )}
            </InputContainer>

            <InputGroup columns="2">
              <InputContainer>
                <InputLabel>SENHA</InputLabel>
                <InputText type="password" name="senha" ref={register} />
              </InputContainer>

              <InputContainer>
                <InputLabel>CONFIRMAÇÃO</InputLabel>
                <InputText
                  type="password"
                  name="confirmacaoSenha"
                  ref={register}
                />
                {errors.confirmacaoSenha && (
                  <FeedbackError>
                    {errors.confirmacaoSenha.message}
                  </FeedbackError>
                )}
              </InputContainer>
            </InputGroup>

            <InputContainer>
              <InputLabel>UG *</InputLabel>
              <select
                className="select-css"
                name="unidadeGestora"
                ref={register}
              >
                <option value="">Selecione</option>
                {ugs.map(ug => (
                  <option key={ug.codigo} value={ug.codigo}>
                    {ug.codigoUg} - {ug.nome}
                  </option>
                ))}
              </select>
              {errors.unidadeGestora && (
                <FeedbackError>{errors.unidadeGestora.message}</FeedbackError>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>GRUPO *</InputLabel>
              <select className="select-css" name="grupos" ref={register}>
                <option value="">Selecione</option>
                {groups.map(group => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
              {errors.grupos && (
                <FeedbackError>{errors.grupos.message}</FeedbackError>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>ATIVO</InputLabel>
              <Switch onChange={checked => setAtivo(checked)} checked={ativo} />
            </InputContainer>

            <Button type="submit" disabled={!formState.isValid}>
              SALVAR
            </Button>
          </form>
        </Card>
      </New>

      <List>
        <Card title="Pesquisa">
          <form>
            <InputContainer>
              <InputLabel>LOGIN</InputLabel>
              <InputText
                onChange={e => {
                  setFilter({
                    ...filter,
                    login: e.target.value,
                    page: 0,
                  });
                }}
              />
            </InputContainer>
          </form>

          <Table>
            <thead>
              <tr>
                <td>LOGIN</td>
                <td>UG</td>
                <td style={{ textAlign: 'center' }}>STATUS</td>
                <td />
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.codigo}>
                  <td>{user.login}</td>
                  <td>
                    {user.unidadeGestora.codigoUg} - {user.unidadeGestora.nome}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      className={
                        user.ativo
                          ? 'badge badge-success'
                          : 'badge badge-danger'
                      }
                    >
                      {user.ativo ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </td>
                  <Actions>
                    <button
                      type="button"
                      title="Editar"
                      onClick={() => onEdit(user)}
                    >
                      <FaPencilAlt color="#006699" size={16} />
                    </button>

                    <button
                      type="button"
                      title="Excluír"
                      onClick={() => handleDelete(user.codigo)}
                    >
                      <FaTrashAlt color="#ca3e47" size={16} />
                    </button>
                  </Actions>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </Card>
      </List>
    </Container>
  );
}
