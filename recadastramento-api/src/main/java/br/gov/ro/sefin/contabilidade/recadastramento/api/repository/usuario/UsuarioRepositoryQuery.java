package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.UsuarioFilter;

public interface UsuarioRepositoryQuery {

    public Page<Usuario> filtrar(UsuarioFilter filtro, Pageable pageable);
    
}