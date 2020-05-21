package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.unidadegestora;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.UnidadeGestoraFilter;

public interface UnidadeGestoraRepositoryQuery {

    public Page<UnidadeGestora> filtrar(UnidadeGestoraFilter filtro, Pageable pageable);
    
}