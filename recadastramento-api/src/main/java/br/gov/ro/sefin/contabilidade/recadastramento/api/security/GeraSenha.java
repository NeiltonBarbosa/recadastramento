package br.gov.ro.sefin.contabilidade.recadastramento.api.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeraSenha {

	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("5up3r2@2@."));
	}

}
