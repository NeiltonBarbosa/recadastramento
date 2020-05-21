package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.ServidorAtualizado;

public interface ServidorAtualizadoRepository extends JpaRepository<ServidorAtualizado, Long> {

    public Optional<ServidorAtualizado> findByCpf(String cpf);

    public List<ServidorAtualizado>  findByDataHoraAtualizacaoBetween(LocalDateTime de, LocalDateTime ate);
    
}