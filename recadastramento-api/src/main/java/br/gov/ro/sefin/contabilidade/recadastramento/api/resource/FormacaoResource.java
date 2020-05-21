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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Formacao;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.FormacaoRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.FormacaoFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.FormacaoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin("*")
@RestController
@RequestMapping("/formacoes")
public class FormacaoResource {

    @Autowired
    private FormacaoRepository formacaoRepository;

    @Autowired
    private FormacaoService formacaoService;
    
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_FORMACAO')")
    public Page<Formacao> pesquisar(FormacaoFilter filtro, Pageable pageable) {
        return formacaoRepository.filtrar(filtro, pageable);
    }

    @GetMapping(params = "list")
    public List<Formacao> listar() {
        return formacaoRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_FORMACAO')")
    @PostMapping
    public ResponseEntity<Formacao> criar(@RequestBody @Valid Formacao formacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(formacaoService.salvar(formacao));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_FORMACAO')")
    @PutMapping("/{codigo}")
    public ResponseEntity<Formacao> atualizar(@PathVariable Long codigo, @RequestBody @Valid Formacao formacao) {
        return ResponseEntity.ok(formacaoService.atualizar(codigo, formacao));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_FORMACAO')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo) {
        formacaoRepository.deleteById(codigo);
    }
    
    @GetMapping("/{codigo}")
    public ResponseEntity<Formacao> buscarPeloCodigo(@PathVariable Long codigo) {
        Optional<Formacao> formacaoOpt = formacaoRepository.findById(codigo);
        return formacaoOpt.isPresent() ? 
            ResponseEntity.ok(formacaoOpt.get()) : ResponseEntity.notFound().build();
    }
    
}