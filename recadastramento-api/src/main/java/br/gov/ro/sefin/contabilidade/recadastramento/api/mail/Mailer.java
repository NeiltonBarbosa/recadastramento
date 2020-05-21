package br.gov.ro.sefin.contabilidade.recadastramento.api.mail;

import java.io.UnsupportedEncodingException;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import br.gov.ro.sefin.contabilidade.recadastramento.api.mail.exception.MailSendingException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.ServidorAtualizado;

@Component
public class Mailer {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine thymeleaf;

    public void enviarEmailConfirmacaoRecadastramento(ServidorAtualizado servidorAtualizado) {
        Context context = new Context(new Locale("pt", "BR"));
        context.setVariable("servidor", servidorAtualizado);

        try {
            String email = thymeleaf.process("mail/ResumoRecad", context);
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom("no-reply@sefin.ro.gov.br", "Superitendência de Contabilidade");
            helper.setTo(servidorAtualizado.getEmail());
            helper.setSubject("SIAFEM - Confirmação de Recadastramento");
            helper.setText(email, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (MailSendException e) {
            e.printStackTrace();
            throw new MailSendingException("Não conseguimos entregar seu e-mail, por favor verifique-o e tente novamente.");
        } catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

    }
    
    @Async
    public void enviarEmailConfirmacaoHabilitacao(Servidor servidor) {
    	Context context = new Context(new Locale("pt", "BR"));
        context.setVariable("servidor", servidor);
        
        try {
	        String email = thymeleaf.process("mail/ConfirmacaoHabilitacao", context);
	        MimeMessage mimeMessage = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper;
				helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
	        
			helper.setFrom("no-reply@sefin.ro.gov.br", "Superitendência de Contabilidade");
	        helper.setTo(servidor.getEmail());
	        helper.setSubject("SIAFEM - Confirmação de Habilitação");
	        helper.setText(email, true);
	
	        mailSender.send(mimeMessage);
        } catch (MessagingException e) {
        	e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        
    }
    
}