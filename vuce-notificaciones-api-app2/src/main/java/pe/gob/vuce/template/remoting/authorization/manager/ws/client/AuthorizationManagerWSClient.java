package pe.gob.vuce.template.remoting.authorization.manager.ws.client;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pe.gob.vuce.template.remoting.authorization.manager.ws.client.dto.response.VuceUserModel;
import pe.gob.vuce.template.remoting.authorization.manager.ws.client.properties.AuthenticationProperty;

import java.util.Collections;

import static pe.gob.vuce.template.remoting.authorization.manager.ws.client.util.AuthorizationManagerConstante.*;

@Service
@RequiredArgsConstructor
public class AuthorizationManagerWSClient {
	
	//private final AuthenticationProperty authenticationProperties;
	
	public static ResponseEntity<VuceUserModel> getSessionInfo(AuthenticationProperty authenticationProperties, String idSesion) {
        boolean esContingencia = idSesion.contains("CONTINGENCIA-");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set(CLIENT_ID_HEADER, esContingencia ?
                authenticationProperties.getContingenciaClientId() : authenticationProperties.getClientId());
        headers.set(API_KEY_HEADER, esContingencia ?
                authenticationProperties.getContingenciaApiKey() : authenticationProperties.getApiKey());

        HttpEntity request = new HttpEntity(headers);
        String url = UriComponentsBuilder
                .fromUriString(esContingencia ? authenticationProperties.getContingenciaUrl() :
                        authenticationProperties.getUrl())
                .queryParam(esContingencia ? CONTINGENCIA_PARAM_SESSION_ID : PARAM_SESSION_ID, idSesion)
                .build()
                .toUriString();
        RestTemplate authenticationRestTemplate = new RestTemplate();
        ResponseEntity<VuceUserModel> response = authenticationRestTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                VuceUserModel.class);

        return response;
    }
}
