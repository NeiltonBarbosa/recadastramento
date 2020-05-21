package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.mail.Mailer;
import br.gov.ro.sefin.contabilidade.recadastramento.api.mail.exception.MailSendingException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.ServidorAtualizado;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorAtualizadoRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.ServidorAtualizadoException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.ServidorDesabilitadoException;

@Service
public class ServidorAtualizadoService {

    @Autowired
    private ServidorAtualizadoRepository servidorAtualizadoRepository;
    
    @Autowired
    private ServidorRepository servidorRepository;

    @Autowired
    private Mailer mailer;

    @Transactional(rollbackOn = MailSendingException.class)
    public ServidorAtualizado salvar(ServidorAtualizado servidorAtualizado) {
        
        Optional<Servidor> servidorHabilitadoOpt = servidorRepository.findByCpfAndHabilitadoTrue(servidorAtualizado.getCpf());
		if(!servidorHabilitadoOpt.isPresent()) {
			throw new ServidorDesabilitadoException("Servidor não habilitado para recadastramento.");
        }
 
        //Optional<ServidorAtualizado> servidorJaAtualizadoOpt = servidorAtualizadoRepository.findByCpf(servidorAtualizado.getCpf());
        Optional<Servidor> servidorJaAtualizadoOpt = servidorRepository.findByCpfAndAtualizadoTrue(servidorAtualizado.getCpf());
		if (servidorJaAtualizadoOpt.isPresent()) {
			throw new ServidorAtualizadoException("Servidor já realizou recadastramento.");
        }
        
        Servidor servidorHabilitado = servidorHabilitadoOpt.get();
        servidorHabilitado.setEmail(servidorAtualizado.getEmail());
        servidorHabilitado.setAtualizado(true);
        servidorHabilitado.setDataHoraAtualizacao(LocalDateTime.now());
        servidorRepository.save(servidorHabilitado);

        
        // Optional<ServidorAtualizado> servidorAtualizadoSalvo = servidorAtualizadoRepository.findByCpf(servidorAtualizado.getCpf());
        
        servidorAtualizado.setNome(servidorHabilitado.getNome());
        ServidorAtualizado servidorAtualizadoSalvo = servidorAtualizadoRepository.save(servidorAtualizado);
        
        mailer.enviarEmailConfirmacaoRecadastramento(servidorAtualizado);

        return servidorAtualizadoSalvo;
    }

    
}