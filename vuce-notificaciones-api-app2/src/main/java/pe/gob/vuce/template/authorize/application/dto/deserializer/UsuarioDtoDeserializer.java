package pe.gob.vuce.template.authorize.application.dto.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import pe.gob.vuce.template.authorize.application.dto.PerfilDto;
import pe.gob.vuce.template.authorize.application.dto.PersonaDto;
import pe.gob.vuce.template.authorize.application.dto.UsuarioDto;
import pe.gob.vuce.template.authorize.application.enumeration.RequestBodyType;

import java.io.IOException;

public class UsuarioDtoDeserializer extends JsonDeserializer<UsuarioDto> {
    @Override
    public UsuarioDto deserialize(JsonParser jsonParser, DeserializationContext ctxt)
            throws IOException {
        UsuarioDto usuarioDto = null;
        try {
            ObjectCodec objectCodec = jsonParser.getCodec();
            PersonaDto persona = null;
            JsonNode node = objectCodec.readTree(jsonParser);
            JsonNode nodePersona = node.get("persona");
            if (nodePersona != null) {
                persona = PersonaDto
                        .builder()
                        .nombres(nodePersona.get("nombres").asText())
                        .apellidos(nodePersona.get("apellidos").asText())
                        .nroDocumento(nodePersona.get("nroDocumento").asText())
                        .direccion(nodePersona.get("direccion").asText())
                        .telefono(nodePersona.get("telefono").asText())
                        .correo(nodePersona.get("correo") == null ? "" : nodePersona.get("correo").asText())
                        .build();
            }

            JsonNode nodePerfil = node.get("perfil");
            PerfilDto perfil = null;
            if (nodePerfil != null) {
                perfil = new PerfilDto();
                perfil.setId(nodePerfil.get("id").asLong());
                perfil.setPerfil(nodePerfil.get("perfil").asText());
            }
            String nombreUsuario = node.get("usuario").asText();
            String clave = node.get("clave").asText();
            usuarioDto = new UsuarioDto();
            usuarioDto.setUsuario(nombreUsuario);
            //usuarioDto.setClave(clave);
            usuarioDto.setPersona(persona);
            /*usuarioDto = UsuarioDto
		    		.builder()
					.usuario(nombreUsuario)
					.clave(password)
					.persona(persona)
					.perfil(perfil)
					.build();*/
        } catch (Exception ex) {
            usuarioDto = UsuarioDto
                    .builder()
                    .usuario(RequestBodyType.INVALID.toString())
                    //.clave(RequestBodyType.INVALID.toString())
                    .build();
        }
        return usuarioDto;
    }
}
