package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Campanha;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.CampanhaRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.CampanhaException;

@Service
public class CampanhaService {

    @Autowired
    private CampanhaRepository campanhaRepository;

    public Campanha atualizar(Long codigo, Campanha campanha) {
		Campanha campanhaSalva = buscarCampanhaPeloCodigo(codigo);
		
		if (campanha.getDataFim().isBefore(campanha.getDataInicio())) {
			throw new CampanhaException("Data do termino deve ser posterior a data de inicio");
		}
		
		BeanUtils.copyProperties(campanha, campanhaSalva, "codigo");
		
		return campanhaRepository.save(campanha);
	}
	
	private Campanha buscarCampanhaPeloCodigo(Long codigo) {
		Optional<Campanha> campanhaSalva = campanhaRepository.findById(codigo);
		
		if(!campanhaSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		
		return campanhaSalva.get();
	}
    
}