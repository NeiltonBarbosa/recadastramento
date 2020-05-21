package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import javax.validation.constraints.NotBlank;

import br.gov.ro.sefin.contabilidade.recadastramento.api.validation.AtributoConfirmacao;
import lombok.Getter;
import lombok.Setter;

@AtributoConfirmacao(atributo = "novaSenha", atributoConfirmacao = "confirmacaoSenha")
@Getter @Setter
public class AlteracaoSenha {

    @NotBlank
    private String senhaAtual;

    @NotBlank
    private String novaSenha;

    @NotBlank
    private String confirmacaoSenha;
    
}