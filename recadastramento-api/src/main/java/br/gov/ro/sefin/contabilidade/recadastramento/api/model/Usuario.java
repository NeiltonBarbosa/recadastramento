package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import br.gov.ro.sefin.contabilidade.recadastramento.api.validation.AtributoConfirmacao;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@AtributoConfirmacao(atributo = "senha", atributoConfirmacao = "confirmacaoSenha")
@Getter @Setter @EqualsAndHashCode(of = "codigo")
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotBlank
	@Size(max = 6)
    private String login;

    @JsonProperty(access = Access.WRITE_ONLY)
    private String senha;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Transient
    private String confirmacaoSenha;

    private Boolean ativo;

    @NotNull
	@OneToOne
	@JoinColumn(name = "codigo_unidade_gestora")
    private UnidadeGestora unidadeGestora;

    @NotEmpty
	@ManyToMany
	@JoinTable(name = "usuario_grupo", joinColumns = @JoinColumn(name = "codigo_usuario")
		, inverseJoinColumns = @JoinColumn(name = "codigo_grupo"))
	private List<Grupo> grupos;
}