package pe.gob.vuce.template.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class IndicadorDTO {
			
	private int tipoFiltro;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacion = new Date();
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacionFinal = new Date();

	private int total;

	private List<ObjectDTO> tipos;
	
	private List<ObjectDTO> paises;
	
	private List<ObjectDTO> rechazos;
	
	private List<ObjectDTO> peligros;
	
	private ObjectDTO nacional;
	
	private ObjectDTO internacional;
	
	public ObjectDTO getNacional() {
		return nacional;
	}

	public void setNacional(ObjectDTO nacional) {
		this.nacional = nacional;
	}

	public ObjectDTO getInternacional() {
		return internacional;
	}

	public void setInternacional(ObjectDTO internacional) {
		this.internacional = internacional;
	}

	public int getTipoFiltro() {
		return tipoFiltro;
	}

	public void setTipoFiltro(int tipoFiltro) {
		this.tipoFiltro = tipoFiltro;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaCreacionFinal() {
		return fechaCreacionFinal;
	}

	public void setFechaCreacionFinal(Date fechaCreacionFinal) {
		this.fechaCreacionFinal = fechaCreacionFinal;
	}
	
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	
	public List<ObjectDTO> getTipos() {
		return tipos;
	}

	public void setTipos(List<ObjectDTO> tipos) {
		this.tipos = tipos;
	}

	public List<ObjectDTO> getPaises() {
		return paises;
	}

	public void setPaises(List<ObjectDTO> paises) {
		this.paises = paises;
	}

	public List<ObjectDTO> getRechazos() {
		return rechazos;
	}

	public void setRechazos(List<ObjectDTO> rechazos) {
		this.rechazos = rechazos;
	}

	public List<ObjectDTO> getPeligros() {
		return peligros;
	}

	public void setPeligros(List<ObjectDTO> peligros) {
		this.peligros = peligros;
	}	
}
