package br.gov.ro.sefin.contabilidade.recadastramento.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UsuarioRepository;

@Component
public class AuthenticationFacade implements IAuthenticationFacade {

    @Autowired
	private UsuarioRepository usuarioRepository;

    @Override
    public Boolean hasRole(String role) {
        Authentication authentication = (OAuth2Authentication) SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().contains(new SimpleGrantedAuthority(role));
    }

    @Override
    public UnidadeGestora getUnidadeGestoraVinculada() {
		return getCurrentUser().getUnidadeGestora();
    }

    @Override
    public Usuario getCurrentUser() {
        Authentication authentication = (OAuth2Authentication) SecurityContextHolder.getContext().getAuthentication();
		
        return usuarioRepository.findByLogin(authentication.getName()).get();
    }
}
        