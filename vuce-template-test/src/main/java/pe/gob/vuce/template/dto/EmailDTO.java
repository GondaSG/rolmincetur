package pe.gob.vuce.template.dto;

public class EmailDTO {
	
	private int id;
	
	private String[] correos;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String[] getCorreos() {
		return correos;
	}

	public void setCorreos(String[] correos) {
		this.correos = correos;
	}	
}
