package br.gov.ro.sefin.contabilidade.recadastramento.api.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @EqualsAndHashCode(of = "codigo")
@Entity
@Table(name = "campanha")
public class Campanha {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long codigo;

    @Column(name = "data_inicio")
    @NotNull
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    @NotNull
    private LocalDate dataFim;
    
    public boolean isExpired() {
    	return dataFim.isBefore(LocalDate.now());
    }
    
}