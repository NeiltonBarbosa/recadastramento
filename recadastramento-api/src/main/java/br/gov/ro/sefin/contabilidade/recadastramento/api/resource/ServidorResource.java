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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Servidor;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.ServidorFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.ServidorService;

@RestController
@RequestMapping("/servidores")
public class ServidorResource {

    @Autowired
    private ServidorRepository servidorRepository;

    @Autowired
    private ServidorService servidorService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_GERENCIAR_TODO_SERVIDOR', 'ROLE_GERENCIAR_SERVIDOR_VINCULADO_UG')")
    public Page<Servidor> pesquisar(ServidorFilter filtro, Pageable pageable) {
        return servidorRepository.filtrar(filtro, pageable);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Servidor> buscarPeloCpf(@PathVariable String cpf) {
        Optional<Servidor> servidor = servidorRepository.findByCpf(cpf);

        return servidor.isPresent() ? ResponseEntity.ok(servidor.get()) : ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_GERENCIAR_TODO_SERVIDOR', 'ROLE_GERENCIAR_SERVIDOR_VINCULADO_UG')")
    @PostMapping
    public ResponseEntity<Servidor> habilitar(@RequestBody @Valid Servidor servidor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servidorService.habilitar(servidor));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_GERENCIAR_TODO_SERVIDOR', 'ROLE_GERENCIAR_SERVIDOR_VINCULADO_UG')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo) {
        servidorService.excluir(codigo);
    }
    
}