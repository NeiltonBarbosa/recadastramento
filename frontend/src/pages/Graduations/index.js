import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert';
import * as yup from 'yup';

import * as GradutionService from '~/services/graduation';
import * as ExceptionService from '~/services/exception';

import Confirm from '~/components/Confirm';
import Card from '~/components/Card';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import FeedbackError from '~/styles/components/FeedbackError';
import Button from '~/styles/components/Button';
import { Table, Actions } from '~/styles/components/Table';

import { Container, New, List } from './styles';

const validationSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
});

export default function Graduations() {
  const [graduations, setGraduations] = useState([]);
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
    async function loadGraduations() {
      const data = await GradutionService.find(filter);

      setGraduations(data.graduations);
      setPageCount(data.pageCount);
    }

    loadGraduations();
  }, [filter]);

  useEffect(() => {
    document.title = 'Formações';
  }, []);

  async function onSubmit(data) {
    if (data.codigo) {
      await GradutionService.update(data)
        .then(({ data: graduation }) => {
          toast.success('Formação salva com sucesso!');

          setGraduations(
            graduations.map(grad =>
              grad.codigo === graduation.codigo ? graduation : grad
            )
          );

          reset({ codigo: '', nome: '' });
        })
        .catch(error => ExceptionService.handle(error));
    } else {
      await GradutionService.store(data)
        .then(() => {
          toast.success('Formação salva com sucesso!');

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
    await GradutionService.remove(codigo)
      .then(() => {
        toast.success('Formação excluída com sucesso!');
        setGraduations(graduations.filter(g => g.codigo !== codigo));

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
              {graduations.map(graduation => (
                <tr key={graduation.codigo}>
                  <td>{graduation.nome}</td>
                  <Actions>
                    <button
                      type="button"
                      title="Editar"
                      onClick={() => onEdit(graduation)}
                    >
                      <FaPencilAlt color="#006699" size={16} />
                    </button>

                    <button
                      type="button"
                      title="Excluír"
                      onClick={() => handleDelete(graduation.codigo)}
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
