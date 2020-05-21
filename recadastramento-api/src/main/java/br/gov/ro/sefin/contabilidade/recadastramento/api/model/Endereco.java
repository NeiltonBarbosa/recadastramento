package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Embeddable
public class Endereco {

    @NotBlank
    private String cep;

    @Size(max = 50)
    @NotBlank
    private String logradouro;

    @Size(max = 10)
    @NotBlank
    private String numero;

    @Size(max =  30)
    private String complemento;

    @Size(max = 50)
    @NotBlank
    private String bairro;

    @Size(max = 50)
    @NotBlank
    @Column(name = "cidade")
    private String localidade;

    @Size(max = 2)
    @NotBlank
    private String uf;
    
}