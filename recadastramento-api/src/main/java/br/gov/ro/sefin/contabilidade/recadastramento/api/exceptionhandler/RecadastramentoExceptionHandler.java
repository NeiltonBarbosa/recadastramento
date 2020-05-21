package br.gov.ro.sefin.contabilidade.recadastramento.api.exceptionhandler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.gov.ro.sefin.contabilidade.recadastramento.api.mail.exception.MailSendingException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.CampanhaException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.PasswordRequiredException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.ServidorAtualizadoException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.ServidorDesabilitadoException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.UnidadeGestoraObrigatoriaException;
import lombok.Getter;

@ControllerAdvice
public class RecadastramentoExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
	private MessageSource messageSource;

    @Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		List<Erro> erros = criarListaErros(ex.getBindingResult());
		return handleExceptionInternal(ex, erros, headers, HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({ EntidadeJaCadastradaException.class } )
	private ResponseEntity<Object> handleEmailJaCadastradoException(EntidadeJaCadastradaException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}
	
	@ExceptionHandler({ CampanhaException.class } )
	private ResponseEntity<Object> handleCampanhaException(CampanhaException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}
	
	@ExceptionHandler({ UnidadeGestoraObrigatoriaException.class } )
	private ResponseEntity<Object> handleUnidadeGestoraObrigatoriaException(UnidadeGestoraObrigatoriaException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}

	@ExceptionHandler({ PasswordRequiredException.class } )
	private ResponseEntity<Object> handlePasswordRequiredException(PasswordRequiredException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}
	
	@ExceptionHandler({ ServidorAtualizadoException.class } )
	private ResponseEntity<Object> handleServidorAtualizadoException(ServidorAtualizadoException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}

	@ExceptionHandler({ ServidorDesabilitadoException.class } )
	private ResponseEntity<Object> handleServidorDesabilitadoException(ServidorDesabilitadoException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.toString())));
	}

	@ExceptionHandler({ MailSendingException.class} )
	private ResponseEntity<Object> handleMailSendingException(MailSendingException ex, WebRequest request) {
		return ResponseEntity.badRequest().body(Arrays.asList(new Erro(ex.getMessage(), ex.getClass().getSimpleName())));
	}
    
    private List<Erro> criarListaErros(BindingResult bindingResult) {
		List<Erro> erros = new ArrayList<>();
		
		for (FieldError fieldError : bindingResult.getFieldErrors()) {
			String message = messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
			String trace = fieldError.toString();
			erros.add(new Erro(message, trace));
		}
			
		return erros;
	}
    
    @Getter
	public static class Erro {
		
		private String message;
		private String trace;
		
		public Erro(String message, String trace) {
			this.message = message;
			this.trace = trace;
		}
		
	}
}