package br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception;

public class CampanhaException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public CampanhaException(String message) {
        super(message);
    }
}