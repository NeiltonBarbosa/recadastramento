package br.gov.ro.sefin.contabilidade.recadastramento.api.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Perfil;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.PerfilService;

@RestController
@RequestMapping("/perfil")
public class PerfilResource {
	
	@Autowired
	private PerfilService perfilService;
	
	@PutMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody @Valid Perfil perfil) {
		perfilService.update(perfil);
	}
	
}
