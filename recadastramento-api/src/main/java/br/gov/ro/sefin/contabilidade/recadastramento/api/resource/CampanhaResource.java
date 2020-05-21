package br.gov.ro.sefin.contabilidade.recadastramento.api.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Campanha;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.CampanhaRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.CampanhaService;

@RestController
@RequestMapping("/campanhas")

public class CampanhaResource {

    @Autowired
	private CampanhaRepository  campanhaRepository;
	
	@Autowired
	private CampanhaService campanhaService;
    
    @GetMapping
	public ResponseEntity<Campanha> buscarCampanha() {
		return ResponseEntity.ok(campanhaRepository.findAll().get(0));
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_GERENCIAR_CAMPANHA')")
	public ResponseEntity<Campanha> atualizar(@PathVariable Long codigo, @Valid @RequestBody Campanha campanha) {
		Campanha campanhaSalva = campanhaService.atualizar(codigo, campanha);
		
		return ResponseEntity.ok(campanhaSalva);
	}
}