package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Formacao;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.formacao.FormacaoRepositoryQuery;

public interface FormacaoRepository extends JpaRepository<Formacao, Long>, FormacaoRepositoryQuery {

    public Optional<Formacao> findByNomeIgnoreCase(String nome);
    
}