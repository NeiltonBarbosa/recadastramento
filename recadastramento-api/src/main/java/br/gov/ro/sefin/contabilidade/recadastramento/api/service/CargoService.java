package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Cargo;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.CargoRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public Cargo salvar(Cargo cargo) {
        Optional<Cargo> cargoExistente = cargoRepository.findByNomeIgnoreCase(cargo.getNome());

        if (cargoExistente.isPresent()) {
            throw new EntidadeJaCadastradaException("Nome já cadastrado");
        }

        return cargoRepository.save(cargo);
    }

    public Cargo atualizar(Long codigo, Cargo cargo) {
        Cargo cargoSalvo = buscarUnidadeGestoraPeloCodigo(codigo);
        Optional<Cargo> cargoExistente = cargoRepository.findByNomeIgnoreCase(cargo.getNome());

        if (cargoExistente.isPresent() && !cargoExistente.get().equals(cargoSalvo)) {
            throw new EntidadeJaCadastradaException("Nome já cadastrado");
        }

        BeanUtils.copyProperties(cargo, cargoSalvo, "codigo");

        return cargoRepository.save(cargoSalvo);
    }

    private Cargo buscarUnidadeGestoraPeloCodigo(Long codigo) {
		Optional<Cargo> cargoSalvo = cargoRepository.findById(codigo);
		if (!cargoSalvo.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return cargoSalvo.get();
	}
}