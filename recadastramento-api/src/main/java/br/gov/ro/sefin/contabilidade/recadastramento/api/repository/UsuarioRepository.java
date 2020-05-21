package br.gov.ro.sefin.contabilidade.recadastramento.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.usuario.UsuarioRepositoryQuery;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>, UsuarioRepositoryQuery {

    public Optional<Usuario> findByUnidadeGestora(UnidadeGestora unidadeGestora);

    public Optional<Usuario> findByLoginIgnoreCase(String login);

    public Optional<Usuario> findByLogin(String login);

    @Query("select distinct p.role from Usuario u inner join u.grupos g inner join g.permissoes p where u = :usuario")
	List<String> permissoes(@Param("usuario") Usuario usuario);
    
}