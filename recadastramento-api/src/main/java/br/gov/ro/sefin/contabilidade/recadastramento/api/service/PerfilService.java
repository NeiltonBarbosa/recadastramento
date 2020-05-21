package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Perfil;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UsuarioRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.security.IAuthenticationFacade;

@Service
public class PerfilService {

	@Autowired
	private IAuthenticationFacade authentication;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	public void update(Perfil perfil) {
		Usuario usuarioLogado = authentication.getCurrentUser();
		
		usuarioLogado.setSenha(passwordEncoder.encode(perfil.getSenha()));
		usuarioLogado.setConfirmacaoSenha(usuarioLogado.getSenha());
		
		usuarioRepository.save(usuarioLogado);
	}
	
}
