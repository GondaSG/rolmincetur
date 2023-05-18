package pe.gob.vuce.template.remoting.sunat.ws.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pe.gob.vuce.template.remoting.sunat.ws.client.dto.response.ConsultaRUCModel;
import pe.gob.vuce.template.remoting.sunat.ws.client.util.SunatConstante;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class SunatWSClient {

	@SuppressWarnings("finally")
	public static ResponseEntity<ConsultaRUCModel> callWsConsultaRuc(String baseUrl, String numeroRuc) {
		ResponseEntity<ConsultaRUCModel> response = null;
		try {
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity request = new HttpEntity(headers);
        String url = UriComponentsBuilder
                .fromUriString(baseUrl + "/" + SunatConstante.PATH_CONTRIBUYENTE)
                .queryParam(SunatConstante.PARAM_SUNAT_NUMERO_RUC, numeroRuc)
                .build()
                .toUriString();
        RestTemplate consultaRucRestTemplate = new RestTemplate();
        response = consultaRucRestTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                ConsultaRUCModel.class);
        } catch(ResourceAccessException e) {
        	log.info("callWsConsultaRuc::Error detail: {}", "La url de consulta RUC no se encuentra disponible.");
        	log.info("callWsConsultaRuc::Error main message: {}", e.getLocalizedMessage());
        }  catch(Exception e) {
        	log.info("callWsConsultaRuc::Error detail: {}", "Se ha producido un error, verificar el mensaje.");
        	log.info("callWsConsultaRuc::Error main message: {}", e.getLocalizedMessage());
        } finally {
        	return response;
        }
    }
}
