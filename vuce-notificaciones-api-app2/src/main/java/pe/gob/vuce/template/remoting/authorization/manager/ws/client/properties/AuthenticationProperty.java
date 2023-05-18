package pe.gob.vuce.template.remoting.authorization.manager.ws.client.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@ConfigurationProperties(prefix = "mincetur.authentication")
@Getter
@Setter
public class AuthenticationProperty {
    private String url;
    private Duration connectTimeout;
    private Duration readTimeout;
    private String apiKey;
    private String clientId;
    private String pathEcm;
    private String urlWsSunat;
    private String urlWsConsultaRuc;
    private String contingenciaUrl;
    private String contingenciaApiKey;
    private String contingenciaClientId;
    private String operatorTypesValid;
}
