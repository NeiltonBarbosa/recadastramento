import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import * as UgService from '~/services/ug';
import * as ExceptionService from '~/services/exception';

import Confirm from '~/components/Confirm';
import Card from '~/components/Card';

import InputGroup from '~/styles/components/InputGroup';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import FeedbackError from '~/styles/components/FeedbackError';
import Button from '~/styles/components/Button';

import { Table, Actions } from '~/styles/components/Table';

import { Container, New, List } from './styles';

const validationSchema = yup.object().shape({
  codigoUg: yup.string().required('Código obrigatório'),
  nome: yup.string().required('Nome obrigatório'),
  emailContador: yup.string().email('E-mail inválido'),
});

export default function Ugs() {
  const [ugs, setUgs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState({
    page: 0,
    codigoUg: '',
    nome: '',
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
    async function loadUgs() {
      const data = await UgService.find(filter);

      setUgs(data.ugs);
      setPageCount(data.pageCount);
    }

    loadUgs();
  }, [filter]);

  useEffect(() => {
    document.title = 'Unidades Gestoras';
  }, []);

  function resetValues() {
    reset({
      codigo: '',
      codigoUg: '',
      nome: '',
      nomeContador: '',
      emailContador: '',
      telefoneContador: '',
    });
  }

  async function onSubmit(data) {
    if (data.codigo) {
      await UgService.update(data)
        .then(({ data: ug }) => {
          toast.success('UG salva com sucesso!');

          setUgs(ugs.map(u => (u.codigo === ug.codigo ? ug : u)));

          resetValues();
        })
        .catch(error => ExceptionService.handle(error));
    } else {
      await UgService.store(data)
        .then(({ data: ug }) => {
          toast.success('UG salva com sucesso!');

          setUgs([...ugs, ug]);

          resetValues();
        })
        .catch(error => ExceptionService.handle(error));
    }
  }

  function onEdit(data) {
    setValue('codigo', data.codigo);
    setValue('codigoUg', data.codigoUg, true);
    setValue('nome', data.nome, true);
    setValue('nomeContador', data.nomeContador);
    setValue('emailContador', data.emailContador, true);
    setValue('telefoneContador', data.telefoneContador);
  }

  async function onDelete(codigo) {
    await UgService.remove(codigo)
      .then(() => {
        toast.success('UG excluída com sucesso!');
        setUgs(ugs.filter(u => u.codigo !== codigo));

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
              <InputLabel>CÓDIGO *</InputLabel>
              <InputText name="codigoUg" ref={register} maxLength="6" />
              {errors.codigoUg && (
                <FeedbackError>{errors.codigoUg.message}</FeedbackError>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>NOME *</InputLabel>
              <InputText name="nome" ref={register} />
              {errors.nome && (
                <FeedbackError>{errors.nome.message}</FeedbackError>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>CONTADOR</InputLabel>
              <InputText name="nomeContador" ref={register} />
            </InputContainer>

            <InputGroup columns="2">
              <InputContainer>
                <InputLabel>E-MAIL</InputLabel>
                <InputText name="emailContador" ref={register} />
                {errors.emailContador && (
                  <FeedbackError>{errors.emailContador.message}</FeedbackError>
                )}
              </InputContainer>

              <InputContainer>
                <InputLabel>TELEFONE</InputLabel>
                <InputMask mask="(99) 9999-9999">
                  <InputText name="telefoneContador" ref={register} />
                </InputMask>
              </InputContainer>
            </InputGroup>

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
                <InputLabel>CÓDIGO</InputLabel>
                <InputText
                  onChange={e => {
                    setFilter({
                      ...filter,
                      codigoUg: e.target.value,
                      page: 0,
                    });
                  }}
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>NOME</InputLabel>
                <InputText
                  onChange={e => {
                    setFilter({
                      ...filter,
                      nome: e.target.value,
                      page: 0,
                    });
                  }}
                />
              </InputContainer>
            </InputGroup>
          </form>

          <Table>
            <thead>
              <tr>
                <td>CÓDIGO</td>
                <td>NOME</td>
                <td />
              </tr>
            </thead>

            <tbody>
              {ugs.map(ug => (
                <tr key={ug.codigo}>
                  <td>{ug.codigoUg}</td>
                  <td>{ug.nome}</td>
                  <Actions>
                    <button
                      type="button"
                      title="Editar"
                      onClick={() => onEdit(ug)}
                    >
                      <FaPencilAlt color="#006699" size={16} />
                    </button>

                    <button
                      type="button"
                      title="Excluír"
                      onClick={() => handleDelete(ug.codigo)}
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
