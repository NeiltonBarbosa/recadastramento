package br.gov.ro.sefin.contabilidade.recadastramento.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;

import br.gov.ro.sefin.contabilidade.recadastramento.api.config.property.RecadastramentoProperty;


@SpringBootApplication
@EnableAsync
@EnableConfigurationProperties(RecadastramentoProperty.class)
public class RecadastramentoApiApplication extends SpringBootServletInitializer {
	
	public static void main(String[] args) {
		SpringApplication.run(RecadastramentoApiApplication.class, args);
	}

}
