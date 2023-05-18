package pe.gob.vuce.template.siges.controller;


import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.gob.vuce.template.remoting.filenet.ws.client.dto.request.FilenetUploadRequestDto;
import pe.gob.vuce.template.remoting.filenet.ws.client.util.FilenetUtil;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

@RestController
@RequestMapping(value="documento")
public class DocumentoController {

	@Autowired(required = true)
    FilenetUtil filenetWSClient;

    private JSONObject getParametrosLogin() throws JSONException {
        JSONObject response3 = new JSONObject();
        response3.put("username", "mincetur-buzonelectronico");
        response3.put("password", "AmwJux54x9");
        return response3;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody()
    public ResponseEntity<?> file(){
        ResponseEntity<?> item2 = new ResponseEntity<>();
        try {
            String url = "https://landing-test.vuce.gob.pe/v1/vuce-services/filenet";
            JSONObject response2 = this.getParametrosLogin();
            String dt = filenetWSClient.getToken(url, response2.toString());
            JSONObject jsonObject = new JSONObject(dt);
            item2.setExtra(jsonObject.getString("token"));
            item2.setSuccess(true);
        } catch (Exception ex) {
            item2.setMessage(ex.getMessage());
            item2.setSuccess(false);
        }
        return item2;
    }

    @RequestMapping(value = "/file", method = RequestMethod.POST)
    @ResponseBody()
    public ResponseEntity<?> file(@RequestBody FilenetUploadRequestDto item){
        ResponseEntity<?> item2 = new ResponseEntity<>();
    	try {
            String url = "https://landing-test.vuce.gob.pe/v1/vuce-services/filenet";
            JSONObject response2 = this.getParametrosLogin();
            String dt = filenetWSClient.getToken(url, response2.toString());
            JSONObject jsonObject = new JSONObject(dt);
            JSONObject response3 = new JSONObject();
            response3.put("codigoExpediente", item.getCodigoExpediente());
            response3.put("tipoExpediente", item.getTipoExpediente());
            response3.put("codComponente", item.getCodComponente());
            response3.put("orden", item.getOrden());
            response3.put("nombre", item.getNombre());
            response3.put("bytes", item.getBytes());
            response3.put("metadata", "[{'key':'correlativo','value':1.0},{'key':adjunto_id,'value':11308424.0}]");
            String token = jsonObject.getString("token");
            String idDocumento = filenetWSClient.uploadFile(url, response3.toString(), token);
            item2.setExtra(idDocumento);
            item2.setSuccess(true);
    	} catch (Exception ex) {
            item2.setMessage(ex.getMessage());
            item2.setSuccess(false);
    	}
        return item2;
    }
}
