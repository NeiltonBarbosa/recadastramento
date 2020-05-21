package br.gov.ro.sefin.contabilidade.recadastramento.api.security.exception;

import org.springframework.security.oauth2.common.exceptions.ClientAuthenticationException;

public class CampaingExpiredException extends ClientAuthenticationException {

	public CampaingExpiredException(String msg) {
		super(msg);
	}

	private static final long serialVersionUID = 1L;

	@Override
	public String getOAuth2ErrorCode() {
		return "campanha_expirada";
	}

    
}