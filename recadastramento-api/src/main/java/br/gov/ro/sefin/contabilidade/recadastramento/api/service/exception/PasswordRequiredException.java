package br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception;


public class PasswordRequiredException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    
    public PasswordRequiredException(String message) {
        super(message);
    }
}