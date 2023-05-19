-- ACTUALIZACION PARA TODAS LAS TABLAS
-- CAMPOS: FECHA_CREACION, USUARIO_CREACION

UPDATE siges.asignacion	SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.asignacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.asignacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.categoria_alimento	SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.categoria_alimento ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.categoria_alimento ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.ciudad	SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.ciudad ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.ciudad ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.estado SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.estado ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.estado ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.fase SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.fase ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.fase ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.fuente_notificacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.fuente_notificacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.fuente_notificacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_accion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_accion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_accion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_cerrada SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_cerrada ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_cerrada ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_declaracion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_declaracion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_declaracion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_discrepancia SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_discrepancia ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_discrepancia ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_documento SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_documento ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_documento ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_estado SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_estado ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_estado ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_fase SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_fase ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_fase ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_lote SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_lote ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_lote ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_no_declaracion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_no_declaracion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_no_declaracion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.notificacion_presentacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.notificacion_presentacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.notificacion_presentacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.origen_notificacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.origen_notificacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.origen_notificacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.pais SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.pais ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.pais ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.rol SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.rol ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.rol ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.rol_asignacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.rol_asignacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.rol_asignacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.tipo_alimento SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.tipo_alimento ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.tipo_alimento ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.tipo_documento SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.tipo_documento ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.tipo_documento ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.tipo_notificacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.tipo_notificacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.tipo_notificacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.tipo_presentacion SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.tipo_presentacion ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.tipo_presentacion ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.tipo_usuario SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.tipo_usuario ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.tipo_usuario ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.unidad_medida SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.unidad_medida ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.unidad_medida ALTER COLUMN usuario_creacion SET NOT NULL;

UPDATE siges.usuario SET fecha_creacion='11/05/2023', usuario_creacion='SIGTI';		
ALTER TABLE siges.usuario ALTER COLUMN fecha_creacion SET NOT NULL;
ALTER TABLE siges.usuario ALTER COLUMN usuario_creacion SET NOT NULL;