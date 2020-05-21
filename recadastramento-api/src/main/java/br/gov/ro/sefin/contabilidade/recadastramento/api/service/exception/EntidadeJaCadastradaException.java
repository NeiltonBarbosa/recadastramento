package br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception;

public class EntidadeJaCadastradaException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EntidadeJaCadastradaException(String message) {
        super(message);
    }
}