package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Embeddable
public class Funcional {

    @Size(max = 20)
    private String matricula;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private Classificacao classificacao;

    @Column(name = "ano_nomeacao")
    @Size(max = 4)
    @NotBlank
    private String anoNomeacao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "codigo_cargo")
    private Cargo cargo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_escolar")
    private NivelEscolar nivelEscolar;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "codigo_formacao")
    private Formacao formacao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "codigo_unidade_gestora_origem")
    private UnidadeGestora unidadeGestoraOrigem;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "codigo_unidade_gestora_atual")
    private UnidadeGestora unidadeGestoraAtual;
    
}