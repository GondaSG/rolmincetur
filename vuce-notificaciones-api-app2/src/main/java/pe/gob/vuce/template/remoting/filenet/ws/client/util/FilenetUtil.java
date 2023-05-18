package pe.gob.vuce.template.remoting.filenet.ws.client.util;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import pe.gob.vuce.template.remoting.filenet.ws.client.FilenetWSClient;

import java.util.HashMap;
import java.util.Map;

@Component
public class FilenetUtil {

	public static String getToken(String baseUrl, String jsonStr) {
		Map<String, Object> responseLogin = new HashMap<>();
		StringBuilder jsonContent = new StringBuilder();
		jsonContent.append(jsonStr);
		FilenetWSClient.sendRequestPost(baseUrl, FilenetConstante.PATH_LOGIN, jsonContent, null, responseLogin);
		if(Integer.valueOf(responseLogin.get("status").toString()) == HttpStatus.OK.value()) {
			return responseLogin.get("response1").toString();
		}
		return "Login Error";
	}
	
	public static String uploadFile(String baseUrl, String jsonStr, String token) {
		Map<String, Object> responseUpload = new HashMap<>();
		StringBuilder jsonContent = new StringBuilder();
		jsonContent.append(jsonStr);
		FilenetWSClient.sendRequestPost(baseUrl, FilenetConstante.PATH_UPLOAD, jsonContent, token, responseUpload);
		if(Integer.valueOf(responseUpload.get("status").toString()) == HttpStatus.OK.value()) {
			return responseUpload.get("response1").toString();
		}
		return "Upload Error";
	}
	
	public static String deleteFile(String baseUrl, String documentId, String token) {
		Map<String, Object> responseDeleted = new HashMap<>();
		StringBuilder guidParameter = new StringBuilder();
		guidParameter.append(documentId);
		FilenetWSClient.sendRequestPost(baseUrl, FilenetConstante.PATH_DELETE, guidParameter, token, responseDeleted);
		if(Integer.valueOf(responseDeleted.get("status").toString()) == HttpStatus.OK.value()) {
			return responseDeleted.get("response1").toString();
		}
		return "Deleted Error";
	}
}
