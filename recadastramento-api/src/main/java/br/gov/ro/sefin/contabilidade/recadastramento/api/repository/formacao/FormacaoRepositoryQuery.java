package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.formacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Formacao;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.FormacaoFilter;

public interface FormacaoRepositoryQuery {

    public Page<Formacao> filtrar(FormacaoFilter filtro, Pageable pageable);
    
}