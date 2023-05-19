package pe.gob.vuce.template.dto;

public class ObjectDTO {
	
	private int id;
	
	private String nombre;
	
	private int cantidad;
	
	private String isoAlfa2;
	
	private String isoAlfa3;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	
	public String getIsoAlfa2() {
		return isoAlfa2;
	}
	
	public void setIsoAlfa2(String isoAlfa2) {
		this.isoAlfa2 = isoAlfa2;
	}
	
	public String getIsoAlfa3() {
		return isoAlfa3;
	}
	
	public void setIsoAlfa3(String isoAlfa3) {
		this.isoAlfa3 = isoAlfa3;
	}
}
