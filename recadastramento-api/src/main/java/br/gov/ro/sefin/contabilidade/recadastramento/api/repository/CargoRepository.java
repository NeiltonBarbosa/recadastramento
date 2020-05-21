package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Cargo;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.cargo.CargoRepositoryQuery;

public interface CargoRepository extends JpaRepository<Cargo, Long>, CargoRepositoryQuery {

    public Optional<Cargo> findByNomeIgnoreCase(String nome);
    
}