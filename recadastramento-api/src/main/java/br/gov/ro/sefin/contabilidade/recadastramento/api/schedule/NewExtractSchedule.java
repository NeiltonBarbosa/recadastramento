package br.gov.ro.sefin.contabilidade.recadastramento.api.schedule;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;

import br.gov.ro.sefin.contabilidade.recadastramento.api.model.ServidorAtualizado;
import br.gov.ro.sefin.contabilidade.recadastramento.api.repository.ServidorAtualizadoRepository;
import net.schmizz.sshj.SSHClient;
import net.schmizz.sshj.sftp.SFTPClient;
import net.schmizz.sshj.transport.verification.PromiscuousVerifier;

@Component
@EnableScheduling
public class NewExtractSchedule {

	private static final String HOST = "172.22.0.85";
    private static final String USER = "recad";
    private static final String PASSWORD = "super@2020";
    private static final String REMOTE_DIR = "";
    private static final String LOCAL_DIR = ResourceUtils.CLASSPATH_URL_PREFIX;

    @Autowired
    private ServidorAtualizadoRepository servidorAtualizadoRepository;

    // @Scheduled(cron = "0 0 * * * *")
    // @Scheduled(fixedDelay = 60000)
    public void extract() {
        try {

        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime de = LocalDateTime.of(agora.toLocalDate(), LocalTime.of(0, 0, 0));
        LocalDateTime ate = LocalDateTime.of(agora.toLocalDate(), LocalTime.of(23, 59, 59));
        
        // LocalDateTime de = LocalDateTime.of(2020, 03, 4, 0, 0, 0);
        // LocalDateTime ate = LocalDateTime.of(2020, 03, 5, 23, 59, 59);
        

        System.out.println("Processo de extração de servidores recadastrados iniciado...");
        System.out.println("Data: " + agora.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
        System.out.println("Buscando servidores recadastrados entre " + de.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) + " e " + ate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));

        List<ServidorAtualizado> servidores = servidorAtualizadoRepository.findByDataHoraAtualizacaoBetween(de, ate);
        
        if (!servidores.isEmpty()) {
			System.out.println("Gerando arquivo...");
			
            String fileName = agora.format(DateTimeFormatter.ofPattern("ddMMyyyy")) + ".txt";
            
			System.out.println("Iniciando extração...");
			
			FileOutputStream outputStream = new FileOutputStream(ResourceUtils.CLASSPATH_URL_PREFIX + fileName, true);
			
            servidores.forEach(servidor -> {
                try {
                	byte[] line = (generateLine(servidor) + System.getProperty("line.separator")).getBytes("ASCII");
                	
                	outputStream.write(line);
                	
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            SSHClient sshClient = setupSshj();
    	    SFTPClient sftpClient = sshClient.newSFTPClient();
    	  
    	    sftpClient.put(LOCAL_DIR + fileName, REMOTE_DIR + fileName);
    	  
    	    sftpClient.close();
    	    sshClient.disconnect();
            
			System.out.println("Extração finalizada...");
			System.out.println("Nome do arquivo: " + fileName);
			System.out.println("Total extraído: " + servidores.size());
			
			outputStream.close();
			
			removeLocalFile(fileName);
        }
        	
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void removeLocalFile(String fileName) throws IOException {
		Path fileToDeletePath = Paths.get(LOCAL_DIR + fileName);
		Files.delete(fileToDeletePath);
    }
    
    private SSHClient setupSshj() throws IOException {
	    SSHClient client = new SSHClient();
	    client.addHostKeyVerifier(new PromiscuousVerifier());
	    client.connect(HOST, 22);
	    client.authPassword(USER, PASSWORD);
	    return client;
	}

    private String generateLine(ServidorAtualizado servidor) {
		String cpf = normalize(servidor.getCpfSemFormatacao(), 11).substring(0, 11);
		String nome = normalize(servidor.getNome(), 40).substring(0, 40);
		String rg = normalize(servidor.getRg(), 20).substring(0, 20);
		String orgaoEmissor = normalize(servidor.getOrgaoEmissor(), 4).substring(0, 4);
		String ufEmissor = normalize(servidor.getUfEmissor(), 2).substring(0, 2);
		String email = normalize(servidor.getEmail(), 50).substring(0, 50);
		String telefoneCorporativo = normalize(servidor.getTelefoneCorporativo(), 15).substring(0, 15);
		String telefoneCelular = normalize(servidor.getTelefoneCelular(), 15).substring(0, 15);
		String cep = normalize(servidor.getEndereco().getCep(), 10).substring(0, 10);
		String logradouro = normalize(servidor.getEndereco().getLogradouro(), 50).substring(0, 50);
		String numero = normalize(servidor.getEndereco().getNumero(), 10).substring(0, 10);
		String bairro = normalize(servidor.getEndereco().getBairro(), 50).substring(0, 50);
		String complemento = normalize(servidor.getEndereco().getComplemento(), 30).substring(0, 30);
		String cidade = normalize(servidor.getEndereco().getLocalidade(), 50).substring(0, 50);
		String uf = normalize(servidor.getEndereco().getUf().toString(), 2).substring(0, 2);
		String matricula = normalize(servidor.getFuncional().getMatricula(), 9).substring(0, 9);;
		String classificacao = normalize(servidor.getFuncional().getClassificacao().toString(), 12).substring(0, 12);;
		String anoNomeacao = normalize(servidor.getFuncional().getAnoNomeacao(), 4).substring(0, 4);;
		String cargo = normalize(servidor.getFuncional().getCargo().getNome(), 40).substring(0, 40);;
		String nivelEscolar = normalize(servidor.getFuncional().getNivelEscolar().getDescricao(), 46).substring(0, 46);;
		String formacao = normalize(servidor.getFuncional().getFormacao().getNome(), 64).substring(0, 64);;
		String ugOrigem = normalize(servidor.getFuncional().getUnidadeGestoraOrigem().getCodigoUg(), 6).substring(0, 6);;
		String ugAtual = normalize(servidor.getFuncional().getUnidadeGestoraAtual().getCodigoUg(), 6).substring(0, 6);;
		
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
    	if (StringUtils.isEmpty(value)) {
    		return String.format("%-" + length + "s", "");
    	}
    	
		String normalizado = Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
		normalizado = String.format("%-" + length + "s", normalizado);
		
		return normalizado.toUpperCase();
	}
    
}