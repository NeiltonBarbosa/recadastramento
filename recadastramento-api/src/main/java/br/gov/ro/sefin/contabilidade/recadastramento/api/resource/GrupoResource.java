package br.gov.ro.sefin.contabilidade.recadastramento.api.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Grupo;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.GrupoRepository;

@PreAuthorize("hasAuthority('ROLE_GERENCIAR_GRUPO')")
@RestController
@RequestMapping("/grupos")
public class GrupoResource {

    @Autowired
    private GrupoRepository grupos;

    @GetMapping(params = "list")
    public List<Grupo> listar() {
        return grupos.findAll();
    }
    
}