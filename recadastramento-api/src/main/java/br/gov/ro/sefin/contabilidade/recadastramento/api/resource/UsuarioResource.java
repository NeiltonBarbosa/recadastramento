package br.gov.ro.sefin.contabilidade.recadastramento.api.resource;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UsuarioRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.UsuarioFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioResource {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;
    
    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_USUARIO')")
    @GetMapping
    public Page<Usuario> pesquisar(UsuarioFilter filtro, Pageable pageable) {
        return usuarioRepository.filtrar(filtro, pageable);
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_USUARIO')")
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody @Valid Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.salvar(usuario));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_USUARIO')")
    @GetMapping("/{codigo}")
    public ResponseEntity<Usuario> buscar(@PathVariable Long codigo) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(codigo);
        return usuarioOpt.isPresent() ? 
         ResponseEntity.ok(usuarioOpt.get()) : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_USUARIO')")
    @PutMapping("/{codigo}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long codigo, @RequestBody @Valid Usuario usuario) {
        return ResponseEntity.ok(usuarioService.atualizar(codigo, usuario));
    }


    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_USUARIO')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        usuarioRepository.deleteById(codigo);
    }
}