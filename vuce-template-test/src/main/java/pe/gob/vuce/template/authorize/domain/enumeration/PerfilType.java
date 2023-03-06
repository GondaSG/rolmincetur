package pe.gob.vuce.template.authorize.domain.enumeration;

public enum PerfilType {

	PERFIL_ADMINISTRADOR(1L, "PENX.FUNCIONARIO.ADMIN", "admin", "Administrador del sistema"),
	PERFIL_REGISTRADOR(2L, "PENX.FUNCIONARIO.REGISTRADOR", "register", "Registrador de actividades"),
	PERFIL_REVISOR(3L, "PENX.FUNCIONARIO.REVISOR", "reviewer", "Evaluador responsable del Programa"),
	PERFIL_APROBADOR(4L, "PENX.FUNCIONARIO.APROBADOR", "approver", "Evaluador responsable del Pilar"),
	PERFIL_OPERADOR(5L, "PENX.OPERADOR", "operator", "Operador")
	;

	private final Long ID;
	private final String code;
	private final String alternateCode;
	private final String name;
	
	PerfilType(Long ID, String code, String alternateCode, String name) {
		this.ID = ID;
		this.code = code;
		this.alternateCode = alternateCode;
		this.name = name;
	}
	
	public static String getPerfilByAlterno(String alternateMaster) {
		for (PerfilType m : PerfilType.values()) {
			if(m.getAlternateCode().equalsIgnoreCase(alternateMaster)) return m.getCode();
		}
		return "";
	}
	
	public static Long getIdByCode(String code) {
		for (PerfilType m : PerfilType.values()) {
			if(m.getCode().equalsIgnoreCase(code)) return m.getID();
		}
		return null;
	}
	
	public Long getID() {
		return ID;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getAlternateCode() {
		return alternateCode;
	}

	public String getName() {
		return name;
	}
}
