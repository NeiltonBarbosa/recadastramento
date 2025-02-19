package br.gov.ro.sefin.contabilidade.recadastramento.api.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import lombok.Getter;

public class UsuarioSistema extends User {

    private static final long serialVersionUID = 1L;
	
	@Getter
	private Usuario usuario;
	
	public UsuarioSistema(Usuario usuario, Collection<? extends GrantedAuthority> authorities) {
		super(usuario.getLogin(), usuario.getSenha(), authorities);
		this.usuario = usuario;
	}
}