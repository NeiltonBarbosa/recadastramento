package br.gov.ro.sefin.contabilidade.recadastramento.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.Usuario;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.UsuarioRepository;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.EntidadeJaCadastradaException;
import br.gov.ro.sefin.contabilidade.recadastramento.api.service.exception.PasswordRequiredException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public Usuario salvar(Usuario usuario) {
        Optional<Usuario> usuarioLoginExistente = usuarioRepository.findByLoginIgnoreCase(usuario.getLogin());
        if (usuarioLoginExistente.isPresent()) {
            throw new EntidadeJaCadastradaException("Login já cadastrado");
        }
        
        Optional<Usuario> usuarioUgExistente = usuarioRepository.findByUnidadeGestora(usuario.getUnidadeGestora());
        if (usuarioUgExistente.isPresent()) {
            throw new EntidadeJaCadastradaException("Usuário já cadastrado para esta UG");
        }

        if (StringUtils.isEmpty(usuario.getSenha())) {
            throw new PasswordRequiredException("Senha obrigatória");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setConfirmacaoSenha(usuario.getSenha());

        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long codigo, Usuario usuario) {
        Usuario usuarioSalvo = buscarUsuarioPeloCodigo(codigo);

        Optional<Usuario> usuarioLoginExistente = usuarioRepository.findByLoginIgnoreCase(usuario.getLogin());
        if (usuarioLoginExistente.isPresent()
            && !usuarioLoginExistente.get().equals(usuarioSalvo)) {
            throw new EntidadeJaCadastradaException("Login já cadastrado");
        }
        
        Optional<Usuario> usuarioUgExistente = usuarioRepository.findByUnidadeGestora(usuario.getUnidadeGestora());
        if (usuarioUgExistente.isPresent()
            && !usuarioUgExistente.get().equals(usuarioSalvo)) {
            throw new EntidadeJaCadastradaException("Usuário já cadastrado para esta UG");
        }

        if (StringUtils.isEmpty(usuario.getSenha())) {
            usuario.setSenha(usuarioSalvo.getSenha());
            usuario.setConfirmacaoSenha(usuarioSalvo.getSenha());
        } else {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            usuario.setConfirmacaoSenha(usuario.getSenha());
        }

        BeanUtils.copyProperties(usuario, usuarioSalvo, "codigo");

        return usuarioRepository.save(usuarioSalvo);
    }

    public Usuario buscarUsuarioPeloCodigo(Long codigo) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(codigo);
        if(!usuarioOpt.isPresent()) {
            throw new EmptyResultDataAccessException(1);
        }

        return usuarioOpt.get();
    }
}