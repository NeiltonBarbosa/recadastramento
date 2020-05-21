package br.gov.ro.sefin.contabilidade.recadastramento.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ConfigurationProperties("recadastramento")
public class RecadastramentoProperty {

    private String origemPermitida = "http://localhost:3000";
    
}