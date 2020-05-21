package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.servidor;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.ServidorFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.paginacao.PaginacaoUtil;
import br.gov.ro.sefin.contabilidade.recadastramento.api.security.IAuthenticationFacade;

public class ServidorRepositoryImpl implements ServidorRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Autowired
    private PaginacaoUtil paginacaoUtil;

    @Autowired
    private IAuthenticationFacade authentication;

    @Override
    public Page<Servidor> filtrar(ServidorFilter filtro, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Servidor> criteria = builder.createQuery(Servidor.class);
        Root<Servidor> root = criteria.from(Servidor.class);

        Predicate[] predicates = criarRestricoes(filtro, builder, root);
        criteria.where(predicates);

        paginacaoUtil.adicionarRestricoesDeOrdenacao(builder, root, criteria, pageable);
        TypedQuery<Servidor> query = manager.createQuery(criteria);
        paginacaoUtil.adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(filtro));
    }

    private Long total(ServidorFilter filtro) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Servidor> root = criteria.from(Servidor.class);
		
		Predicate[] predicates = criarRestricoes(filtro, builder, root);
		criteria.where(predicates);
		
		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}
    
    private Predicate[] criarRestricoes(ServidorFilter filtro, CriteriaBuilder builder, Root<Servidor> root) {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(
            builder.isTrue(root.get("habilitado"))
        );

        if(!StringUtils.isEmpty(filtro.getNome())) {
			predicates.add(
					builder.like(root.get("nome"), "%" + filtro.getNome() + "%")
					);
		}
		
		if(!StringUtils.isEmpty(filtro.getCpf())) {
			predicates.add(
					builder.equal(root.get("cpf"), filtro.getCpf())
					);
		}
		
		if(!filtro.getUnidadesGestoras().isEmpty()) {
			predicates.add(
					root.get("unidadeGestora").in(filtro.getUnidadesGestoras())
					);
		}
		
		if(!StringUtils.isEmpty(filtro.getStatus())) {
			if(filtro.getStatus().equals("ATUALIZADO")) {
				predicates.add(
						builder.isTrue(root.get("atualizado"))
						);
			}
			
			if(filtro.getStatus().equals("PENDENTE")) {
				predicates.add(
						builder.isFalse(root.get("atualizado"))
						);
			}
		}
		
		
		if(!authentication.hasRole("ROLE_GERENCIAR_TODO_SERVIDOR")) {
			predicates.add(
					builder.equal(root.get("unidadeGestora"), authentication.getUnidadeGestoraVinculada())
					);
		}
		
		return predicates.toArray(new Predicate[predicates.size()]);
    }
}