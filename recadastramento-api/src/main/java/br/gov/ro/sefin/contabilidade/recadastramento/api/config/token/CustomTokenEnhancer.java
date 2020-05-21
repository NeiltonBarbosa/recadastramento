package br.gov.ro.sefin.contabilidade.recadastramento.api.config.token;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import br.gov.ro.sefin.contabilidade.recadastramento.api.security.UsuarioSistema;


public class CustomTokenEnhancer implements TokenEnhancer {

    @Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		UsuarioSistema usuarioSistema = (UsuarioSistema) authentication.getPrincipal();
		
		Map<String, Object> addInfo = new HashMap<>();
		
		String name = usuarioSistema.getUsuario().getLogin();
		String ug = usuarioSistema.getUsuario().getUnidadeGestora().getNome();
		
		addInfo.put("user_name", name);
		addInfo.put("user_id", usuarioSistema.getUsuario().getCodigo());
		addInfo.put("ug", ug);
		
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(addInfo);
		return accessToken;
	}
    
}