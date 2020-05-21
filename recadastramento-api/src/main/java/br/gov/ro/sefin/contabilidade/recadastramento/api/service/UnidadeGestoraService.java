package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UnidadeGestoraRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;

@Service
public class UnidadeGestoraService {

    @Autowired
    private UnidadeGestoraRepository unidadeGestoraRepository;

    public UnidadeGestora salvar(UnidadeGestora unidadeGestora) {
        Optional<UnidadeGestora> unidadeGestoraExistente = unidadeGestoraRepository.findByCodigoUg(unidadeGestora.getCodigoUg());

        if (unidadeGestoraExistente.isPresent()) {
            throw new EntidadeJaCadastradaException("Código de ug já cadastrado");
        }
        	
        return unidadeGestoraRepository.save(unidadeGestora);
    }

    public UnidadeGestora atualizar(Long codigo, UnidadeGestora unidadeGestora) {
        UnidadeGestora unidadeGestoraSalva = buscarUnidadeGestoraPeloCodigo(codigo);
        Optional<UnidadeGestora> unidadeGestoraExistente = unidadeGestoraRepository.findByCodigoUg(unidadeGestora.getCodigoUg());
        
        if (unidadeGestoraExistente.isPresent() 
            && !unidadeGestoraExistente.get().equals(unidadeGestoraSalva)) {
            throw new EntidadeJaCadastradaException("Código de ug já cadastrado");
        }

		BeanUtils.copyProperties(unidadeGestora, unidadeGestoraSalva, "codigo");
		
		return unidadeGestoraRepository.save(unidadeGestoraSalva);
    }

    private UnidadeGestora buscarUnidadeGestoraPeloCodigo(Long codigo) {
		Optional<UnidadeGestora> unidadeGestoraSalva = unidadeGestoraRepository.findById(codigo);
		if (!unidadeGestoraSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return unidadeGestoraSalva.get();
	}

}