
package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import lombok.Getter;

public enum Classificacao {

    EFETIVO("Efetivo"),
    COMISSIONADO("Comissionado"),
    ESTAGIARIO("Estagiário");

    @Getter
    private String descricao;

    Classificacao(String descricao) {
        this.descricao = descricao;
    }
    
}