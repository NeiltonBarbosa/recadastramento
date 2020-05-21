package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.paginacao;


import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PaginacaoUtil {

    public void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
        int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina); 
    }

    public void adicionarRestricoesDeOrdenacao(CriteriaBuilder builder, Root<?> root,
			CriteriaQuery<?> criteria, Pageable pageable) {
		Sort sort = pageable.getSort();
		if(sort != null && sort.isSorted()) {
			Sort.Order order = sort.iterator().next();
			
			String property = order.getProperty();
			
			criteria.orderBy(order.isAscending() ? builder.asc(root.get(property)): builder.desc(root.get(property)));
		}
		
	}
    
}