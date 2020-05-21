package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.servidor.ServidorRepositoryQuery;

public interface ServidorRepository extends JpaRepository<Servidor, Long>, ServidorRepositoryQuery {

    public Optional<Servidor> findByCpf(String cpf);

    public Optional<Servidor> findByCpfAndHabilitadoTrue(String cpf);
    
    public Optional<Servidor> findByCpfAndAtualizadoTrue(String cpf);
}