package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Formacao;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.FormacaoRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;

@Service
public class FormacaoService {

    @Autowired
    private FormacaoRepository formacaoRepository;

    public Formacao salvar(Formacao formacao) {
        Optional<Formacao> formacaoExistente = formacaoRepository.findByNomeIgnoreCase(formacao.getNome());

        if (formacaoExistente.isPresent()) {
            throw new EntidadeJaCadastradaException("Nome já cadastrado");
        }

        return formacaoRepository.save(formacao);
    }

    public Formacao atualizar(Long codigo, Formacao formacao) {
        Formacao formacaoSalva = buscarFormacaoPeloCodigo(codigo);
        Optional<Formacao> formacaoExistente = formacaoRepository.findByNomeIgnoreCase(formacao.getNome());

        if (formacaoExistente.isPresent() && !formacaoExistente.get().equals(formacaoSalva)) {
            throw new EntidadeJaCadastradaException("Nome já cadastrado");
        }

        BeanUtils.copyProperties(formacao, formacaoSalva, "codigo");

        return formacaoRepository.save(formacaoSalva);
    }

    private Formacao buscarFormacaoPeloCodigo(Long codigo) {
		Optional<Formacao> formacaoSalva = formacaoRepository.findById(codigo);
		if (!formacaoSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return formacaoSalva.get();
	}

}