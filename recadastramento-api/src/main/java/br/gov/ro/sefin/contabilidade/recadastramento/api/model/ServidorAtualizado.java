package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.validator.constraints.br.CPF;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;    

@Getter @Setter @EqualsAndHashCode(of = "codigo")
@Entity
@Table(name = "servidor_atualizado")
public class ServidorAtualizado {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long codigo;

    private String nome;

    @NotBlank
    @CPF
    private String cpf;

    @Size(max = 20)
    @NotBlank
    private String rg;

    @NotBlank
    @Column(name = "orgao_emissor")
    private String orgaoEmissor;

    @NotBlank
    @Size(max = 2)
    @Column(name = "uf_emissor")
    private String ufEmissor;

    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @NotBlank
	@Column(name = "telefone_corporativo")
    private String telefoneCorporativo;

    @Column(name = "telefone_celular")
    private String telefoneCelular;

    @Embedded
    @Valid
    private Endereco endereco = new Endereco();

    @Embedded
    @Valid
    private Funcional funcional = new Funcional();

    @Column(name = "data_hora_atualizacao")
    private LocalDateTime dataHoraAtualizacao = LocalDateTime.now();

    @Transient
	@JsonIgnore
	public String getDataHoraAtualizacaoFormatada() {
		return this.dataHoraAtualizacao.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }
    
    @Transient
    @JsonIgnore
    public String getCpfSemFormatacao() {
		return cpf.replaceAll("\\.|-|/", "");
	}

}