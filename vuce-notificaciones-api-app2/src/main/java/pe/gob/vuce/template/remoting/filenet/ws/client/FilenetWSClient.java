package pe.gob.vuce.template.remoting.filenet.ws.client;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Component;
import pe.gob.vuce.template.remoting.filenet.ws.client.util.FilenetConstante;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Component
public class FilenetWSClient {
	
	public static void sendRequestPost(String strBaseURL, String specificPath, StringBuilder jsonContent, String token, Map<String, Object> response) {
		String uri = strBaseURL + "/" + specificPath;
		try {
			if(FilenetConstante.PATH_LOGIN.equals(specificPath)) {
				login(uri, jsonContent, response);
			}
			if(FilenetConstante.PATH_UPLOAD.equals(specificPath)) {
				upload(token, uri, jsonContent, response);
			}
			if(FilenetConstante.PATH_DELETE.equals(specificPath)) {
				delete(token, uri, jsonContent, response);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static void login(final String urlBase, final StringBuilder jsonContent, final Map<String, Object> response) throws IOException {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		StringBuilder urlPost = new StringBuilder(urlBase);
		MultipartEntityBuilder builder = MultipartEntityBuilder.create();  
		HttpEntity multiPartEntity = builder.build();
		HttpPost httpPost = new HttpPost(urlPost.toString());
		httpPost.addHeader("accept", "application/json");
		httpPost.addHeader("enctype", "multipart/form-data");
		httpPost.setEntity(multiPartEntity);
		if(!"".equals(jsonContent.toString())) {
			httpPost.addHeader("Content-Type", "application/json");
			httpPost.setEntity(new StringEntity(jsonContent.toString(), "UTF-8"));
		}
		CloseableHttpResponse httpResponse = httpClient.execute(httpPost);
		response.put("status", httpResponse.getStatusLine().getStatusCode());
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				httpResponse.getEntity().getContent()));

		String inputLine;
		int i = 0;
		while ((inputLine = reader.readLine()) != null) {
			i++;
			response.put("response" + i, inputLine);
		}
		reader.close();
		httpClient.close();
	}
	
	private static void upload(final String token, final String urlBase, StringBuilder jsonContent, final Map<String, Object> response) throws IOException {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		StringBuilder urlPost = new StringBuilder(urlBase);
		MultipartEntityBuilder builder = MultipartEntityBuilder.create();  
		HttpEntity multiPartEntity = builder.build();
		HttpPost httpPost = new HttpPost(urlPost.toString());
		httpPost.addHeader("accept", "application/json");
		httpPost.addHeader("authorization", token);
		httpPost.setEntity(multiPartEntity);
		if(!"".equals(jsonContent.toString())) {
			httpPost.addHeader("Content-Type", "application/json");
			httpPost.setEntity(new StringEntity(jsonContent.toString(), "UTF-8"));
		}
		CloseableHttpResponse httpResponse = httpClient.execute(httpPost);
		response.put("status", httpResponse.getStatusLine().getStatusCode());
		BufferedReader reader = new BufferedReader(new InputStreamReader(
		httpResponse.getEntity().getContent()));

		String inputLine;
		int i = 0;
		while ((inputLine = reader.readLine()) != null) {
			i++;
			response.put("response" + i, inputLine);
		}
		reader.close();
		httpClient.close();
	}
	
	private static void delete(final String token, final String urlBase, StringBuilder jsonParam, final Map<String, Object> response) throws IOException {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		StringBuilder urlPost = new StringBuilder(urlBase);
	    
	    List<NameValuePair> qparams = new ArrayList<NameValuePair>(); 
	    qparams.add(new BasicNameValuePair(FilenetConstante.GUID_PARAM_KEY, jsonParam.substring(1, jsonParam.length()-1)));
	    String params = URLEncodedUtils.format(qparams, FilenetConstante.DEFAULT_ENCODING); 

		HttpDelete httpPost = new HttpDelete(buildUrl(urlPost.toString(), params));
		httpPost.addHeader("accept", "application/json");
		httpPost.addHeader("authorization", token);
		CloseableHttpResponse httpResponse = httpClient.execute(httpPost);
		response.put("status", httpResponse.getStatusLine().getStatusCode());
		BufferedReader reader = new BufferedReader(new InputStreamReader(
		httpResponse.getEntity().getContent()));

		String inputLine;
		int i = 0;
		while ((inputLine = reader.readLine()) != null) {
			i++;
			response.put("response" + i, inputLine);
		}
		reader.close();
		httpClient.close();
	}
	
	private static String buildUrl(String apiServerUrl, String apiParameters) 
    { 
        StringBuffer urlWithParameters = new StringBuffer(apiServerUrl + "?"); 
        urlWithParameters.append(apiParameters); 
        return urlWithParameters.toString(); 
    } 
	
}
