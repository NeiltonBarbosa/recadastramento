package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Grupo;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {

    
}