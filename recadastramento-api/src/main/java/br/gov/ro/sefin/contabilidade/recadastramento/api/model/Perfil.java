package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import br.gov.ro.sefin.contabilidade.recadastramento.api.validation.AtributoConfirmacao;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AtributoConfirmacao(atributo = "senha", atributoConfirmacao = "confirmacaoSenha")
public class Perfil {

	private String senha;
	private String confirmacaoSenha;
	
}
