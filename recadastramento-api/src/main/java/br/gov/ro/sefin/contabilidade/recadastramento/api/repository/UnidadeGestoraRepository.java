package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.unidadegestora.UnidadeGestoraRepositoryQuery;

public interface UnidadeGestoraRepository extends JpaRepository<UnidadeGestora, Long>, UnidadeGestoraRepositoryQuery {

    public Optional<UnidadeGestora> findByCodigoUg(String codigoUg);
    
}