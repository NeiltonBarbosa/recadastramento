package br.gov.ro.sefin.contabilidade.recadastramento.api.schedule;

import java.io.IOException;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.ServidorAtualizado;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorAtualizadoRepository;
import jcifs.smb.NtlmPasswordAuthentication;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileOutputStream;

// @Component
// @EnableScheduling
public class ExtractSchedule {

    private static final String USER = "recadastramento";
    private static final String PASSWORD = "sefin@2018";

    @Autowired
    private ServidorAtualizadoRepository servidorAtualizadoRepository;

//    @Scheduled(cron = "0 0 * * * *")
    public void extract() {
        try {

        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime corte = LocalDateTime.of(agora.toLocalDate(), LocalTime.of(17, 49, 59));
        LocalDateTime fim = LocalDateTime.of(agora.toLocalDate(), LocalTime.of(23, 59, 59));

        LocalDateTime de = agora.minus(1, ChronoUnit.HOURS);
        LocalDateTime ate = agora.minus(1, ChronoUnit.SECONDS);

        System.out.println("Processo de extração de servidores recadastrados iniciado...");
        System.out.println("Data: " + agora.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
        System.out.println("Buscando servidores recadastrados entre " + de.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) + " e " + ate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));

        List<ServidorAtualizado> servidores = servidorAtualizadoRepository.findByDataHoraAtualizacaoBetween(de, ate);
        
        System.out.println(servidores.isEmpty());
        if (!servidores.isEmpty()) {
			System.out.println("Gerando arquivo...");
            String fileName = "recad" + agora.format(DateTimeFormatter.ofPattern("ddMMyyyy")) + ".txt";

            if (agora.isAfter(corte) && agora.isBefore(fim)) {
                fileName = "recad" + agora.plusDays(1).format(DateTimeFormatter.ofPattern("ddMMyyyy")) + ".txt";
            }

            NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication(null, USER, PASSWORD);
            SmbFile file = new SmbFile("smb://172.22.0.85//recad//" + fileName, auth);
            SmbFileOutputStream outputStream = new SmbFileOutputStream(file, true);

			System.out.println("Iniciando extração...");
            servidores.forEach(servidor -> {
                try {
                    outputStream.write((generateLine(servidor) + System.getProperty("line.separator")).getBytes("ASCII"));
                } catch (IOException e) {
                    e.printStackTrace();
                } 
            });
			System.out.println("Extração finalizada...");
			System.out.println("Nome do arquivo: " + fileName);
			System.out.println("Total extraído: " + servidores.size());

            outputStream.close();
        }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateLine(ServidorAtualizado servidor) {
		String cpf = normalize(servidor.getCpfSemFormatacao(), 11);
		String nome = normalize(servidor.getNome(), 40);
		String rg = normalize(servidor.getRg(), 20);
		String orgaoEmissor = normalize(servidor.getOrgaoEmissor(), 4);
		String ufEmissor = normalize(servidor.getUfEmissor(), 2);
		String email = normalize(servidor.getEmail(), 50);
		String telefoneCorporativo = normalize(servidor.getTelefoneCorporativo(), 15);
		String telefoneCelular = normalize(servidor.getTelefoneCelular(), 15);
		String cep = normalize(servidor.getEndereco().getCep(), 10);
		String logradouro = normalize(servidor.getEndereco().getLogradouro(), 50);
		String numero = normalize(servidor.getEndereco().getNumero(), 10);
		String bairro = normalize(servidor.getEndereco().getBairro(), 50);
		String complemento = normalize(servidor.getEndereco().getComplemento(), 30);
		String cidade = normalize(servidor.getEndereco().getLocalidade(), 50);
		String uf = normalize(servidor.getEndereco().getUf().toString(), 2);
		String matricula = normalize(servidor.getFuncional().getMatricula(), 9);
		String classificacao = normalize(servidor.getFuncional().getClassificacao().toString(), 12);
		String anoNomeacao = normalize(servidor.getFuncional().getAnoNomeacao(), 4);
		String cargo = normalize(servidor.getFuncional().getCargo().getNome(), 40);
		String nivelEscolar = normalize(servidor.getFuncional().getNivelEscolar().getDescricao(), 46);
		String formacao = normalize(servidor.getFuncional().getFormacao().getNome(), 64);
		String ugOrigem = normalize(servidor.getFuncional().getUnidadeGestoraOrigem().getCodigoUg(), 6);
		String ugAtual = normalize(servidor.getFuncional().getUnidadeGestoraAtual().getCodigoUg(), 6);
		
		String tripa = 
				  cpf + "#"
				+ nome + "#"
				+ rg + "#"
				+ orgaoEmissor + "#"
				+ ufEmissor + "#"
				+ email + "#"
				+ telefoneCorporativo + "#"
				+ telefoneCelular + "#"
				+ cep + "#"
				+ logradouro + "#"
				+ numero + "#"
				+ bairro + "#"
				+ complemento + "#"
				+ cidade + "#"
				+ uf + "#"
				+ matricula + "#"
				+ classificacao + "#"
				+ anoNomeacao + "#"
				+ cargo.toUpperCase() + "#"
				+ nivelEscolar + "#"
				+ formacao + "#"
				+ ugOrigem + "#"
				+ ugAtual;
		
		return tripa;
	}

    private String normalize(String value, int length) {
		String normalizado = Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
		normalizado = String.format("%-" + length + "s", normalizado);
		
		return normalizado.toUpperCase();
	}
    
}