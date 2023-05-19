package pe.gob.vuce.template.authorize.application.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class TokenDto {
    private String token;
}
