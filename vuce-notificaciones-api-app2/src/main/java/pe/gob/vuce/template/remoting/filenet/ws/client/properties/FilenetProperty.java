package pe.gob.vuce.template.remoting.filenet.ws.client.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "mincetur.filenet")
@Getter
@Setter
public class FilenetProperty {
    private String url;
    private String apiKey;
    private String clientId;
}
