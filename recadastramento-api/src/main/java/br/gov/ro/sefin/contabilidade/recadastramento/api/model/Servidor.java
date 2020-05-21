package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @EqualsAndHashCode(of = "codigo")
@Entity
@Table(name = "servidor")
public class Servidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotBlank
    @CPF
    private String cpf;

    @Size(max = 40)
    @NotBlank
    private String nome;

    @Size(max = 20)
    private String matricula;
    
    @Email
    @NotBlank
    @Size(max = 50)
    private String email;

    @Enumerated(EnumType.STRING)
    private Classificacao classificacao;

    private Boolean habilitado;
    private Boolean atualizado;

    @Column(name = "data_habilitacao")
    private LocalDate dataHabilitacao;

    @Column(name = "data_hora_atualizacao")
    private LocalDateTime dataHoraAtualizacao;

    @ManyToOne
    @JoinColumn(name = "codigo_unidade_gestora")
    private UnidadeGestora unidadeGestora;
    
}