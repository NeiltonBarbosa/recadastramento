package br.gov.ro.sefin.contabilidade.recadastramento.api.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.OverridesAttribute;
import javax.validation.Payload;
import javax.validation.constraints.Pattern;

import br.gov.ro.sefin.contabilidade.recadastramento.api.validation.validator.AtributoConfirmacaoValidator;

@Target({ ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { AtributoConfirmacaoValidator.class })
public @interface AtributoConfirmacao {

    @OverridesAttribute(constraint = Pattern.class, name = "message")
    String message() default "{br.gov.ro.sefin.contabilidade.recadastramento.validation.AtributoConfirmacao.message}";
    
    Class<?>[] groups() default {};
	Class<? extends Payload>[] payload() default {};
	String atributo();
	String atributoConfirmacao();
    
}