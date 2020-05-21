package br.gov.ro.sefin.contabilidade.recadastramento.api.security;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;

public interface IAuthenticationFacade {

    Boolean hasRole(String role);
    UnidadeGestora getUnidadeGestoraVinculada();
    Usuario getCurrentUser();
}