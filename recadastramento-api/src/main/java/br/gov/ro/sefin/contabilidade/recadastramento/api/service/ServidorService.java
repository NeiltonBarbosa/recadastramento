package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.mail.Mailer;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.security.IAuthenticationFacade;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.ServidorAtualizadoException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.UnidadeGestoraObrigatoriaException;

@Service
public class ServidorService {

    @Autowired
    private ServidorRepository servidorRepository;

    @Autowired
	private IAuthenticationFacade authentication;
    
    @Autowired
    private Mailer mailer;

    public Servidor habilitar(Servidor servidor) {
        Optional<Servidor> servidorOpt = servidorRepository.findByCpf(servidor.getCpf());

        if(servidorOpt.isPresent()) {
            Servidor servidorSalvo = servidorOpt.get();

            if(servidorSalvo.getHabilitado()) {
                throw new EntidadeJaCadastradaException("Servidor já habilitado para a unidade gestora: "
                    + servidorSalvo.getUnidadeGestora().getCodigoUg() + " - "
                    + servidorSalvo.getUnidadeGestora().getNome());
            }

            BeanUtils.copyProperties(servidorSalvo, servidor, "unidadeGestora", "email", "matricula", "classificacao");
        }

        if(!authentication.hasRole("ROLE_GERENCIAR_TODO_SERVIDOR")) {
			servidor.setUnidadeGestora(authentication.getUnidadeGestoraVinculada());
        } else {
        	if (servidor.getUnidadeGestora() == null) {
        		throw new UnidadeGestoraObrigatoriaException("Por favor informe uma unidade gestora");
        	}
        }
        
        servidor.setDataHabilitacao(LocalDate.now());
        servidor.setHabilitado(true);
        servidor.setAtualizado(false);
        servidorRepository.save(servidor);
        
        mailer.enviarEmailConfirmacaoHabilitacao(servidor);
        
        return servidor;
    }

    public void excluir(Long codigo) {
        Servidor servidorSalvo = buscarServidorPeloCodigo(codigo);
		
		if(servidorSalvo.getAtualizado()) {
			throw new ServidorAtualizadoException("Impossivel excluir um servidor já atualizado.");
		}
		
		servidorRepository.deleteById(codigo);
    }

    private Servidor buscarServidorPeloCodigo(Long codigo) {
		Optional<Servidor> servidorSalvo = servidorRepository.findById(codigo);
		if(!servidorSalvo.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		
		return servidorSalvo.get();
	}
    
}