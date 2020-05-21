package br.gov.ro.sefin.contabilidade.recadastramento.api.mail.exception;


public class MailSendingException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public MailSendingException(String message) {
        super(message);
    }

}