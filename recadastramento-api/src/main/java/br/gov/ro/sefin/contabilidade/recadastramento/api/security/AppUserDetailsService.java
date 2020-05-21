package br.gov.ro.sefin.contabilidade.recadastramento.api.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Campanha;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.CampanhaRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UsuarioRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.security.exception.CampaingExpiredException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.security.exception.UserNotActiveException;

@Service
public class AppUserDetailsService implements UserDetailsService {


    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CampanhaRepository campanhaRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByLogin(login);
        Usuario usuario = usuarioOptional.orElseThrow(() -> new UsernameNotFoundException("Usuário e ou senha inválida"));
        
        if(!usuario.getAtivo()) {
            throw new UserNotActiveException("Usuário inátivo");
        }
        
        Campanha campanha = campanhaRepository.findAll().get(0);
        
        if (campanha.isExpired()) {
        	boolean allowed = getPermissoes(usuario).stream().filter(p -> { 
        		return p.getAuthority().equals("ROLE_HABILITAR_SERVIDOR_APOS_FIM_CAMPANHA"); 
        	}).findFirst().isPresent();
        	
        	if (!allowed) {
        		throw new CampaingExpiredException("Campanha encerrada");
        	}
        }
        
        return new UsuarioSistema(usuario, getPermissoes(usuario));
    }

    private Collection<? extends GrantedAuthority> getPermissoes(Usuario usuario) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        
        List<String> permissoes = usuarioRepository.permissoes(usuario);
        permissoes.forEach(p -> authorities.add(new SimpleGrantedAuthority(p.toUpperCase())));
        
        return authorities;
    }


}