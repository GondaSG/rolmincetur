package pe.gob.vuce.template.authorize.application.bean;

import java.io.Serializable;

public class ResponseModel implements Serializable {
	
	  private Integer httpStatusCode;
	  private Integer code;
	  private String description;
	  private IData data;
		    
	    public Integer getHttpStatusCode() {
	        return httpStatusCode;
	    }

	    public void setHttpStatusCode(Integer httpStatusCode) {
	        this.httpStatusCode = httpStatusCode;
	    }

	    public Integer getCode() {
	        return code;
	    }

	    public void setCode(Integer code) {
	        this.code = code;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public IData getData() {
	        return data;
	    }

	    public void setData(IData data) {
	        this.data = data;
	    }
}
