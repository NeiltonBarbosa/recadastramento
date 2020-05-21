package br.gov.ro.sefin.contabilidade.recadastramento.api.resource;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.UnidadeGestora;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UnidadeGestoraRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.UnidadeGestoraFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.UnidadeGestoraService;

@CrossOrigin("*")
@RestController
@RequestMapping("/unidades_gestoras")
public class UnidadeGestoraResource {

    @Autowired
    private UnidadeGestoraRepository unidadeGestoraRepository;

    @Autowired
    private UnidadeGestoraService unidadeGestoraService;

    @GetMapping(params = "list")
    public List<UnidadeGestora> listar() {
        return unidadeGestoraRepository.findAll();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_UNIDADE_GESTORA')")
    public Page<UnidadeGestora> pesquisar(UnidadeGestoraFilter filtro, Pageable pageable) {
        return unidadeGestoraRepository.filtrar(filtro, pageable);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<UnidadeGestora> buscarPeloCodigo(@PathVariable Long codigo) {
        Optional<UnidadeGestora> unidadeGestoraOpt = unidadeGestoraRepository.findById(codigo);
        return unidadeGestoraOpt.isPresent() ? 
            ResponseEntity.ok(unidadeGestoraOpt.get()) : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_UNIDADE_GESTORA')")
    @PostMapping
    public ResponseEntity<UnidadeGestora> criar(@RequestBody @Valid UnidadeGestora unidadeGestora) {
        return ResponseEntity.status(HttpStatus.CREATED).body(unidadeGestoraService.salvar(unidadeGestora));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_UNIDADE_GESTORA')")
    @PutMapping("/{codigo}")
    public ResponseEntity<UnidadeGestora> atualizar(@PathVariable Long codigo, @RequestBody @Valid UnidadeGestora unidadeGestora) {
        return ResponseEntity.ok(unidadeGestoraService.atualizar(codigo, unidadeGestora));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_UNIDADE_GESTORA')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        unidadeGestoraRepository.deleteById(codigo);
    }

}