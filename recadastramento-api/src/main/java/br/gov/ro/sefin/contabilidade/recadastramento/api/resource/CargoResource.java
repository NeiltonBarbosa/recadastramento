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

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Cargo;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.CargoRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.filter.CargoFilter;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.CargoService;

@CrossOrigin("*")
@RestController
@RequestMapping("/cargos")
public class CargoResource {

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private CargoService cargoService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_CARGO')")
    public Page<Cargo> pesquisar(CargoFilter filtro, Pageable pageable) {
        return cargoRepository.filtrar(filtro, pageable);
    }

    @GetMapping(params = "list")
    public List<Cargo> listar() {
        return cargoRepository.findAll();
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Cargo> buscarPeloCodigo(@PathVariable Long codigo) {
        Optional<Cargo> cargoOpt = cargoRepository.findById(codigo);
        return cargoOpt.isPresent() ?
            ResponseEntity.ok(cargoOpt.get()) : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_CARGO')")
    @PostMapping
    public ResponseEntity<Cargo> criar(@RequestBody @Valid Cargo cargo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cargoService.salvar(cargo));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_CARGO')")
    @PutMapping("/{codigo}")
    public ResponseEntity<Cargo> atualizar(@PathVariable Long codigo, @RequestBody @Valid Cargo cargo) {
        return ResponseEntity.ok(cargoService.atualizar(codigo, cargo));
    }

    @PreAuthorize("hasAuthority('ROLE_GERENCIAR_CARGO')")
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        cargoRepository.deleteById(codigo);
    }
    
}