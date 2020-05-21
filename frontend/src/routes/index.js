import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Employees from '~/pages/Employees';
import Offices from '~/pages/Offices';
import Graduations from '~/pages/Graduations';
import Ugs from '~/pages/Ugs';
import Users from '~/pages/Users';
import Campaigns from '~/pages/Campaigns';
import Home from '~/pages/Home';
import Forbbiden from '~/pages/Forbbiden';
import NoMatch from '~/pages/NoMatch';

export default function Routes() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/403" component={Forbbiden} />

        <Route
          path="/servidores"
          isPrivate
          component={Employees}
          roles={[
            'ROLE_GERENCIAR_TODO_SERVIDOR',
            'ROLE_GERENCIAR_SERVIDOR_VINCULADO_UG',
          ]}
        />
        <Route
          path="/cargos"
          isPrivate
          component={Offices}
          roles={['ROLE_GERENCIAR_CARGO']}
        />
        <Route
          path="/formacoes"
          isPrivate
          component={Graduations}
          roles={['ROLE_GERENCIAR_FORMACAO']}
        />
        <Route
          path="/unidades_gestoras"
          isPrivate
          component={Ugs}
          roles={['ROLE_GERENCIAR_UNIDADE_GESTORA']}
        />
        <Route
          path="/usuarios"
          isPrivate
          component={Users}
          roles={['ROLE_GERENCIAR_USUARIO']}
        />
        <Route
          path="/campanhas"
          isPrivate
          component={Campaigns}
          roles={['ROLE_GERENCIAR_CAMPANHA']}
        />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
}
