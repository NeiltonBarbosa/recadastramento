package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import lombok.Getter;

public enum NivelEscolar {

    ENSINO_FUNDAMENTAL_INTERROMPIDO("Ensino Fundamental (1º Grau) interrompido"),
	ENSINO_FUNDAMENTAL_CURSANDO("Ensino Fundamental (1º Grau) cursando"),
	ENSINO_FUNDAMENTAL_COMPLETO("Ensino Fundamental (1º Grau) completo"),
	ENSINO_MEDIO_INTERROMPIDO("Ensino Médio (2º Grau) interrompido"),
	ENSINO_MEDIO_CURSANDO("Ensino Médio (2º Grau) cursando"),
	ENSINO_MEDIO_COMPLETO("Ensino Médio (2º Grau) completo"),
	ENSINO_MEDIO_PROFISSIONALIZANTE_COMPLETO("Ensino Médio (2º Grau) Prof. Completo"),
	FORMACAO_SUPERIOR_CURSANDO("Formação Superior (cursando)"),
	FORMACAO_SUPERIOR_COMPLETA("Formação Superior Completa"),
	POS_GRADUACAO_NIVEL_ESPECIALIZACAO("Pós-graduação no Nível Especialização"),
	POS_GRADUACAO_NIVEL_MESTRADO("Pós-graduação no Nível Mestrado"),
	POS_GRADUACAO_NIVEL_DOUTORADO("Pós-graduação no Nível Doutorado");
	

	@Getter
	private String descricao;
	
	NivelEscolar(String descricao) {
		this.descricao = descricao;
	}
    
}