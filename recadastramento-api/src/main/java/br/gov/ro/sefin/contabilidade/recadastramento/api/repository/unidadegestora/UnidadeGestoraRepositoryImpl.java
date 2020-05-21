package br.gov.ro.sefin.contabilidade.recadastramento.api.repository.unidadegestora;

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

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.UnidadeGestoraFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.paginacao.PaginacaoUtil;

public class UnidadeGestoraRepositoryImpl implements UnidadeGestoraRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Autowired
    private PaginacaoUtil paginacaoUtil;

    @Override
    public Page<UnidadeGestora> filtrar(UnidadeGestoraFilter filtro, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<UnidadeGestora> criteria = builder.createQuery(UnidadeGestora.class);
        Root<UnidadeGestora> root = criteria.from(UnidadeGestora.class);

        Predicate[] predicates = criarRestricoes(filtro, builder, root);
        criteria.where(predicates);

        paginacaoUtil.adicionarRestricoesDeOrdenacao(builder, root, criteria, pageable);
        TypedQuery<UnidadeGestora> query = manager.createQuery(criteria);
        paginacaoUtil.adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(filtro));
    }

    private Long total(UnidadeGestoraFilter filtro) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<UnidadeGestora> root = criteria.from(UnidadeGestora.class);
		
		Predicate[] predicates = criarRestricoes(filtro, builder, root);
		criteria.where(predicates);
		
		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

    private Predicate[] criarRestricoes(UnidadeGestoraFilter filtro, CriteriaBuilder builder, Root<UnidadeGestora> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (!StringUtils.isEmpty(filtro.getCodigoUg())) {
            predicates.add(
                builder.like(root.get("codigoUg"), "%" + filtro.getCodigoUg() + "%")
            );
        }

        if (!StringUtils.isEmpty(filtro.getNome())) {
            predicates.add(
                builder.like(root.get(("nome")), "%" + filtro.getNome() + "%")
            );
        }

        return predicates.toArray(new Predicate[predicates.size()]);
    }
}