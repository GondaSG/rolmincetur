package pe.gob.vuce.template.remoting.authorization.manager.ws.client.dto.response;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("rawtypes")
@Data
public class VuceUserModel {
	private String numRUC;
    private String ticket;
    private String nroRegistro;
    private String apeMaterno;
    private String login;
    private String nombreCompleto;
    private String nombres;
    private String codDepend;
    private String codTOpeComer;
    private String codCate;
    private short nivelUO;
    private String codUO;
    private String correo;
    private String usuarioSOL;
    private String id;
    private String desUO;
    private String desCate;
    private String apePaterno;
    private String idCelular;
    private Map map = new HashMap();

    public boolean checkIfUsuarioPrincipal() {
        if (map == null || map.isEmpty() || !map.containsKey("tipUsuario")) {
            return false;
        }

        String tipoUsuario = (String) map.getOrDefault("tipUsuario", "1");
        return tipoUsuario.equals("0");
    }

    public String getTipOrigen() {
        if (map == null || map.isEmpty() || !map.containsKey("tipOrigen")) {
            return null;
        }

        return (String) map.getOrDefault("tipOrigen", null);
    }

    public String getTipUsuario() {
        if (map == null || map.isEmpty() || !map.containsKey("tipUsuario")) {
            return null;
        }

        return (String) map.getOrDefault("tipUsuario", null);
    }

    public HashMap<String, String> getRoles() {
        HashMap<String, String> roles = new HashMap<>();

        if (map == null || map.isEmpty() || !map.containsKey("tipUsuario")) {
            return roles;
        }

        roles = (HashMap<String, String>) map.get("roles");
        return roles;
    }
}
