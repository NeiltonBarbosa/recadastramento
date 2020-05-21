package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.servidor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.ServidorFilter;

public interface ServidorRepositoryQuery {

    public Page<Servidor> filtrar(ServidorFilter filtro, Pageable pageable);
    
}