package pe.gob.vuce.template.remoting.sunat.ws.client.dto.response;

public class ConsultaRUCModel {
	private String ruc;
	private boolean esActivo;
    private boolean esHabido;
    private String razonSocial;
    private String domicioLegal;
    private String representanteLegal;
    private String correo;
    private String telefono;

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public boolean isEsActivo() {
        return esActivo;
    }

    public void setEsActivo(boolean esActivo) {
        this.esActivo = esActivo;
    }

    public boolean isEsHabido() {
        return esHabido;
    }

    public void setEsHabido(boolean esHabido) {
        this.esHabido = esHabido;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getDomicioLegal() {
        return domicioLegal;
    }

    public void setDomicioLegal(String domicioLegal) {
        this.domicioLegal = domicioLegal;
    }

    public String getRepresentanteLegal() {
        return representanteLegal;
    }

    public void setRepresentanteLegal(String representanteLegal) {
        this.representanteLegal = representanteLegal;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class RucModel {\n");
        sb.append("    ruc: ").append(toIndentedString(ruc)).append("\n");
        sb.append("    esActivo: ").append(toIndentedString(esActivo)).append("\n");
        sb.append("    esHabido: ").append(toIndentedString(esHabido)).append("\n");
        sb.append("    razonSocial: ").append(toIndentedString(razonSocial)).append("\n");
        sb.append("    domicioLegal: ").append(toIndentedString(domicioLegal)).append("\n");
        sb.append("    representanteLegal: ").append(toIndentedString(representanteLegal)).append("\n");
        sb.append("    correo: ").append(toIndentedString(correo)).append("\n");
        sb.append("    telefono: ").append(toIndentedString(telefono)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
