package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

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
@Table(name = "formacao")
public class Formacao {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long codigo;
    
    @NotBlank
    @Size(max =  64)
    private String nome;
    
}