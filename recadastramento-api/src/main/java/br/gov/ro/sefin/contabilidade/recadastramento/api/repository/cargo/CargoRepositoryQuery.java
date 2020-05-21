package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.cargo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Cargo;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.CargoFilter;

public interface CargoRepositoryQuery {

    public Page<Cargo> filtrar(CargoFilter filtro, Pageable pageable);
    
}