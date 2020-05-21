import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import * as OfficeService from '~/services/office';
import * as ExceptionService from '~/services/exception';

import Confirm from '~/components/Confirm';
import Card from '~/components/Card';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import Button from '~/styles/components/Button';
import FeedbackError from '~/styles/components/FeedbackError';
import { Table, Actions } from '~/styles/components/Table';

import { Container, New, List } from './styles';

const validationSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
});

export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState({
    page: 0,
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
    async function loadOffices() {
      const data = await OfficeService.find(filter);

      setOffices(data.offices);
      setPageCount(data.pageCount);
    }

    loadOffices();
  }, [filter]);

  useEffect(() => {
    document.title = 'Cargos';
  }, []);

  async function onSubmit(data) {
    if (data.codigo) {
      await OfficeService.update(data)
        .then(({ data: office }) => {
          toast.success('Cargo salvo com sucesso!');

          setOffices(
            offices.map(off => (off.codigo === office.codigo ? office : off))
          );

          reset({ codigo: '', nome: '' });
        })
        .catch(error => ExceptionService.handle(error));
    } else {
      await OfficeService.store(data)
        .then(() => {
          toast.success('Cargo salvo com sucesso!');

          reset({ codigo: '', nome: '' });
        })
        .catch(error => ExceptionService.handle(error));
    }
  }

  function onEdit(office) {
    setValue('codigo', office.codigo);
    setValue('nome', office.nome, true);
  }

  async function onDelete(codigo) {
    await OfficeService.remove(codigo)
      .then(() => {
        toast.success('Cargo excluído com sucesso!');
        setOffices(offices.filter(o => o.codigo !== codigo));

        reset({ codigo: '', nome: '' });
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
              <InputLabel>NOME *</InputLabel>
              <InputText name="nome" ref={register} />
              {errors.nome && (
                <FeedbackError>{errors.nome.message}</FeedbackError>
              )}
            </InputContainer>

            <Button disabled={!formState.isValid}>SALVAR</Button>
          </form>
        </Card>
      </New>

      <List>
        <Card title="Pesquisa">
          <form>
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
          </form>

          <Table>
            <thead>
              <tr>
                <td>NOME</td>
                <td />
              </tr>
            </thead>

            <tbody>
              {offices.map(office => (
                <tr key={office.codigo}>
                  <td>{office.nome}</td>
                  <Actions>
                    <button
                      type="button"
                      title="Editar"
                      onClick={() => onEdit(office)}
                    >
                      <FaPencilAlt color="#006699" size={16} />
                    </button>

                    <button
                      type="button"
                      title="Excluír"
                      onClick={() => handleDelete(office.codigo)}
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
