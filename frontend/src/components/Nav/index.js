import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from 'react-reactive-form';
import { toast } from 'react-toastify';

import * as UserService from '~/services/user';
import * as ExceptionService from '~/services/exception';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import InputText from '~/styles/components/InputText';
import InputLabel from '~/styles/components/InputLabel';
import FeedbackError from '~/styles/components/FeedbackError';
import { hasRole, hasAnyRole } from '~/services/security';
import { signOutRequest } from '~/store/modules/auth/actions';
import { Container, User, Menu, Logo, Separator } from './styles';
import logo from '~/assets/logo-sefin.svg';

const form = FormBuilder.group({
  senha: ['', Validators.required],
  confirmacaoSenha: ['', Validators.required],
});

export default function Nav() {
  const [modal, setModal] = useState(false);

  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOutRequest());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await UserService.updatePassword(form.value)
      .then(() => {
        setModal(false);
        toast.success('Senha alterada com sucesso!');
        form.reset();
      })
      .catch(error => ExceptionService.handle(error));
  }

  return (
    <Container>
      <User>
        <span>{profile.user_name}</span>
        <span>{profile.ug}</span>
      </User>

      <Menu>
        {hasAnyRole([
          'ROLE_GERENCIAR_TODO_SERVIDOR',
          'ROLE_GERENCIAR_SERVIDOR_VINCULADO_UG',
        ]) && (
          <li>
            <NavLink activeClassName="active" to="/servidores">
              Servidores
            </NavLink>
          </li>
        )}

        {hasRole('ROLE_GERENCIAR_CARGO') && (
          <li>
            <NavLink activeClassName="active" to="/cargos">
              Cargos
            </NavLink>
          </li>
        )}

        {hasRole('ROLE_GERENCIAR_FORMACAO') && (
          <li>
            <NavLink activeClassName="active" to="/formacoes">
              Formações
            </NavLink>
          </li>
        )}

        {hasRole('ROLE_GERENCIAR_UNIDADE_GESTORA') && (
          <li>
            <NavLink activeClassName="active" to="/unidades_gestoras">
              Unidades Gestoras
            </NavLink>
          </li>
        )}

        {hasRole('ROLE_GERENCIAR_USUARIO') && (
          <li>
            <NavLink activeClassName="active" to="/usuarios">
              Usuários
            </NavLink>
          </li>
        )}

        {hasRole('ROLE_GERENCIAR_CAMPANHA') && (
          <li>
            <NavLink activeClassName="active" to="/campanhas">
              Campanhas
            </NavLink>
          </li>
        )}
      </Menu>

      <Separator />

      <Menu>
        <li>
          <button type="button" onClick={() => setModal(true)}>
            Alterar senha
          </button>
        </li>

        <li>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </li>
      </Menu>

      <Logo>
        <img src={logo} alt="" />
      </Logo>

      {modal && (
        <Modal closeAction={setModal} title="Alteração de senha">
          <FieldGroup
            control={form}
            render={({ invalid }) => (
              <form>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <InputLabel>SENHA</InputLabel>
                    <FieldControl name="senha">
                      {({ handler, touched, hasError }) => (
                        <>
                          <InputText type="password" {...handler()} />
                          {touched && hasError('required') && (
                            <FeedbackError>Senha obrigatória</FeedbackError>
                          )}
                        </>
                      )}
                    </FieldControl>
                  </div>

                  <div className="col-md-12 col-sm-12">
                    <InputLabel>CONFIRMAÇÃO DE SENHA</InputLabel>
                    <FieldControl name="confirmacaoSenha">
                      {({ handler, touched, hasError }) => (
                        <>
                          <InputText type="password" {...handler()} />
                          {touched && hasError('required') && (
                            <FeedbackError>Senha obrigatória</FeedbackError>
                          )}
                        </>
                      )}
                    </FieldControl>
                  </div>
                </div>

                <Button disabled={invalid} onClick={handleSubmit}>
                  ALTERAR
                </Button>
              </form>
            )}
          />
        </Modal>
      )}
    </Container>
  );
}
