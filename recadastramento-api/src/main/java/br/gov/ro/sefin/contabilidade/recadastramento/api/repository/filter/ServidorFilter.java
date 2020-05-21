package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter;

import java.util.ArrayList;
import java.util.List;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ServidorFilter {

    private String nome;
    private String cpf;
    private List<UnidadeGestora> unidadesGestoras = new ArrayList<>();
    private String status;

}