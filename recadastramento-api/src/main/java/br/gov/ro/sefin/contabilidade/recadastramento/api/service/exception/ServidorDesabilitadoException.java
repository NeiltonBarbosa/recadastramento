package br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception;

public class ServidorDesabilitadoException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public ServidorDesabilitadoException(String message) {
		super(message);
	}
}