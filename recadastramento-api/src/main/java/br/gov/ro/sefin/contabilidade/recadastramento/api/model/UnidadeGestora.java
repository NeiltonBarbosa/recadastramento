package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @EqualsAndHashCode(of = "codigo")
@Entity
@Table(name = "unidade_gestora")
public class UnidadeGestora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotBlank
    @Size(max = 6)
    @Column(name = "codigo_ug")
    private String codigoUg;

    @NotBlank
    @Size(max = 50)
    private String nome;

    @Column(name = "nome_contador")
    @Size(max = 50)
    private String nomeContador;

    @Column(name = "email_contador")
    @Size(max = 50)
    private String emailContador;

    @Column(name = "telefone_contador")
    @Size(max = 15)
    private String telefoneContador;

    private Boolean ativo;

}