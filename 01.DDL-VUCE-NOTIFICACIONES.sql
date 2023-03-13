
-- SCRIPT CREACION DE TABLAS

-- CATEGORIA ALIMENTO
CREATE SEQUENCE IF NOT EXISTS siges.categoria_alimento_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.categoria_alimento
(
    id integer NOT NULL DEFAULT nextval('siges.categoria_alimento_id_seq'::regclass),
    descripcion character varying(200) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categoria_alimento_pk PRIMARY KEY (id)
);

CREATE INDEX categoria_alimento_id_i
ON siges.categoria_alimento(id);
CREATE INDEX categoria_alimento_nombre_i
ON siges.categoria_alimento(nombre);


-- ASIGNACION
CREATE SEQUENCE IF NOT EXISTS siges.asignacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.asignacion
(
    id integer NOT NULL DEFAULT nextval('siges.asignacion_id_seq'::regclass),
    nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tipo_id integer,
    tipo_nombre character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT asignacion_pk PRIMARY KEY (id)
);
CREATE INDEX asignacion_id_i
ON siges.asignacion(id);
CREATE INDEX asignacion_nombre_i
ON siges.asignacion(nombre);


-- ESTADO
CREATE SEQUENCE IF NOT EXISTS siges.estado_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.estado
(
    id integer NOT NULL DEFAULT nextval('siges.estado_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT estado_pk PRIMARY KEY (id)
);
CREATE INDEX estado_id_i
ON siges.estado(id);
CREATE INDEX estado_nombre_i
ON siges.estado(nombre);


-- CIUDAD
CREATE SEQUENCE IF NOT EXISTS siges.ciudad_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.ciudad
(
    id integer NOT NULL DEFAULT nextval('siges.ciudad_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ciudad_pk PRIMARY KEY (id)
);
CREATE INDEX ciudad_id_i
ON siges.ciudad(id);
CREATE INDEX ciudad_nombre_i
ON siges.ciudad(nombre);


-- ENTIDAD
CREATE SEQUENCE IF NOT EXISTS siges.entidad_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.entidad
(
    id integer NOT NULL DEFAULT nextval('siges.entidad_id_seq'::regclass),
    abreviatura character varying(500) COLLATE pg_catalog."default",
    nombre character varying(400) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT entidad_pk PRIMARY KEY (id)
);
CREATE INDEX entidad_id_i
ON siges.entidad(id);
CREATE INDEX entidad_nombre_i
ON siges.entidad(nombre);


--  FASE	
CREATE SEQUENCE IF NOT EXISTS siges.fase_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.fase
(
    id integer NOT NULL DEFAULT nextval('siges.fase_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fase_pk PRIMARY KEY (id)
);	

		
--  FUENTE NOTIFICACION
CREATE SEQUENCE IF NOT EXISTS siges.fuente_notificacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.fuente_notificacion
(
    id integer NOT NULL DEFAULT nextval('siges.fuente_notificacion_id_seq'::regclass),
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    tipo_id integer,
    CONSTRAINT fuente_notificacion_pk PRIMARY KEY (id)
);
CREATE INDEX fuente_notificacion_id_i
ON siges.fuente_notificacion(id);
CREATE INDEX fuente_notificacion_nombre_i
ON siges.fuente_notificacion(nombre);


-- ORIGEN NOTIFICACION
CREATE SEQUENCE IF NOT EXISTS siges.origen_notificacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.origen_notificacion
(
    id integer NOT NULL DEFAULT nextval('siges.origen_notificacion_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT origen_notificacion_pk PRIMARY KEY (id)
);
CREATE INDEX origen_notificacion_id_i
ON siges.origen_notificacion(id);
CREATE INDEX origen_notificacion_nombre_i
ON siges.origen_notificacion(nombre);


-- PAIS
CREATE SEQUENCE IF NOT EXISTS siges.pais_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.pais
(
    id integer NOT NULL DEFAULT nextval('siges.pais_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(250) COLLATE pg_catalog."default" NOT NULL,
	iso_alfa2 character varying(2) COLLATE pg_catalog."default",
    iso_alfa3 character varying(3) COLLATE pg_catalog."default",
    CONSTRAINT pais_pk PRIMARY KEY (id)
);
CREATE INDEX pais_id_i
ON siges.pais(id);
CREATE INDEX pais_nombre_i
ON siges.pais(nombre);


-- ROL
CREATE SEQUENCE IF NOT EXISTS siges.rol_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.rol
(
    id integer NOT NULL DEFAULT nextval('siges.rol_id_seq'::regclass),
    descripcion character varying(600) COLLATE pg_catalog."default",
    nombre character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT rol_pk PRIMARY KEY (id)
);
CREATE INDEX rol_id_i
ON siges.rol(id);
CREATE INDEX rol_nombre_i
ON siges.rol(nombre);	

	
-- ROL ASIGNACION
CREATE TABLE IF NOT EXISTS siges.rol_asignacion
(
    rol_id integer NOT NULL,
    asignacion_id integer NOT NULL,
    CONSTRAINT rol_asignacion_pk PRIMARY KEY (rol_id, asignacion_id),
    CONSTRAINT rol_asignacion_asignacion_fk FOREIGN KEY (asignacion_id)
        REFERENCES siges.asignacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rol_asignacion_rol_fk FOREIGN KEY (rol_id)
        REFERENCES siges.rol (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- TIPO ALIMENTO
CREATE SEQUENCE IF NOT EXISTS siges.tipo_alimento_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.tipo_alimento
(
    id integer NOT NULL DEFAULT nextval('siges.tipo_alimento_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_alimento_pk PRIMARY KEY (id)
);
CREATE INDEX tipo_alimento_id_i
ON siges.tipo_alimento(id);
CREATE INDEX tipo_alimento_nombre_i
ON siges.tipo_alimento(nombre);


-- TIPO NOTIFICACION
CREATE SEQUENCE IF NOT EXISTS siges.tipo_notificacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.tipo_notificacion
(
    id integer NOT NULL DEFAULT nextval('siges.tipo_notificacion_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_notificacion_pk PRIMARY KEY (id)
);

CREATE INDEX tipo_notificacion_id_i
ON siges.tipo_notificacion(id);
CREATE INDEX tipo_notificacion_nombre_i
ON siges.tipo_notificacion(nombre);


-- TIPO PRESENTACION
CREATE SEQUENCE IF NOT EXISTS siges.tipo_presentacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.tipo_presentacion
(
    id integer NOT NULL DEFAULT nextval('siges.tipo_presentacion_id_seq'::regclass),
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_presentacion_pk PRIMARY KEY (id)
);
CREATE INDEX tipo_presentacion_id_i
ON siges.tipo_presentacion(id);
CREATE INDEX tipo_presentacion_nombre_i
ON siges.tipo_presentacion(nombre);	


-- UNIDAD MEDIDA
CREATE SEQUENCE IF NOT EXISTS siges.unidad_medida_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.unidad_medida
(
    id integer NOT NULL DEFAULT nextval('siges.unidad_medida_id_seq'::regclass),
    descripcion character varying(400) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT unidad_medida_pk PRIMARY KEY (id)
);	
CREATE INDEX unidad_medida_id_i
ON siges.unidad_medida(id);
CREATE INDEX unidad_medida_nombre_i
ON siges.unidad_medida(nombre);	


-- TIPO_USUARIO
CREATE SEQUENCE IF NOT EXISTS siges.tipo_usuario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.tipo_usuario
(
    id integer NOT NULL DEFAULT nextval('siges.tipo_usuario_id_seq'::regclass),
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_usuario_pk PRIMARY KEY (id)
);


-- USUARIO
CREATE SEQUENCE IF NOT EXISTS siges.usuario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.usuario
(
    id integer NOT NULL DEFAULT nextval('siges.usuario_id_seq'::regclass),
    codigo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(400) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying(400) COLLATE pg_catalog."default" NOT NULL,
    ruc character varying(20) COLLATE pg_catalog."default" NOT NULL,
    telefono character varying(20) COLLATE pg_catalog."default",
    entidad_id integer NOT NULL,
    rol_id integer NOT NULL,
    tipo_usuario_id integer NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (id),
    CONSTRAINT usuario_entidad_fk FOREIGN KEY (entidad_id)
        REFERENCES siges.entidad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT usuario_tipousuario_fk FOREIGN KEY (tipo_usuario_id)
        REFERENCES siges.tipo_usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT usuario_rol_fk FOREIGN KEY (rol_id)
        REFERENCES siges.rol (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.notificacion
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_id_seq'::regclass),
    codigo_generado character varying(250) COLLATE pg_catalog."default" NOT NULL,
    dato_exportador character varying(250) COLLATE pg_catalog."default",
    dato_importador character varying(250) COLLATE pg_catalog."default",
    fecha_evento timestamp without time zone,
    fecha_notificacion timestamp without time zone,
    fecha_produccion timestamp without time zone,
    fecha_vencimiento timestamp without time zone,
    flag_afectado boolean,
    flag_digesa boolean,
    flag_sanipes boolean,
    flag_senasa boolean,
    nombre_alimento character varying(250) COLLATE pg_catalog."default",
    productor character varying(250) COLLATE pg_catalog."default",
    titulo character varying(250) COLLATE pg_catalog."default",
    categoria_alimento_id integer,
    ciudad_id integer,
    fuente_notificacion_id integer,
    origen_notificacion_id integer,
    pais_id integer,
    tipo_alimento_id integer,
    tipo_notificacion_id integer,
    flag_biologico boolean,
    flag_fisico boolean,
    flag_otro boolean,
    flag_quimico boolean,
    fecha_creacion timestamp without time zone NOT NULL,
    comentario text COLLATE pg_catalog."default",
    peligro_especifico text COLLATE pg_catalog."default",
    flag_activo boolean NOT NULL,
    entidad_id integer,
    flag_nacional boolean,
    CONSTRAINT notificacion_pk PRIMARY KEY (id),
    CONSTRAINT notificacion_entidad_fk FOREIGN KEY (entidad_id)
        REFERENCES siges.entidad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_categoria_fk FOREIGN KEY (categoria_alimento_id)
        REFERENCES siges.categoria_alimento (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_fuente_fk FOREIGN KEY (fuente_notificacion_id)
        REFERENCES siges.fuente_notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_alimento_fk FOREIGN KEY (tipo_alimento_id)
        REFERENCES siges.tipo_alimento (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_origen_fk FOREIGN KEY (origen_notificacion_id)
        REFERENCES siges.origen_notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_ciudad_fk FOREIGN KEY (ciudad_id)
        REFERENCES siges.ciudad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_pais_fk FOREIGN KEY (pais_id)
        REFERENCES siges.pais (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_tipo_fk FOREIGN KEY (tipo_notificacion_id)
        REFERENCES siges.tipo_notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE INDEX notificacion_id_i
ON siges.notificacion(id);


-- NOTIFICACION ESTADO
CREATE TABLE IF NOT EXISTS siges.notificacion_estado
(
    notificacion_id integer NOT NULL,
    estado_id integer NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    flag_activo boolean NOT NULL,
    flag_leido boolean NOT NULL,
    mensaje text COLLATE pg_catalog."default",
    CONSTRAINT notificacion_estado_pk PRIMARY KEY (notificacion_id, estado_id),
    CONSTRAINT notificacion_estado_estado_fk FOREIGN KEY (estado_id)
        REFERENCES siges.estado (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION LOTE
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_lote_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.notificacion_lote
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_lote_id_seq'::regclass),
    cantidad numeric(12,2),
    lote character varying(255) COLLATE pg_catalog."default",
    notificacion_id integer NOT NULL,
    unidad_medida_id integer NOT NULL,
    CONSTRAINT notificacion_lote_pk PRIMARY KEY (id),
    CONSTRAINT notificion_lote_noti_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificion_lote_medida_fk FOREIGN KEY (unidad_medida_id)
        REFERENCES siges.unidad_medida (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE INDEX notificacion_lote_id_i
ON siges.notificacion_lote(id);


-- NOTIFICACION PRESENTACION
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_presentacion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.notificacion_presentacion
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_presentacion_id_seq'::regclass),
    volumen numeric(12,2),
    notificacion_id integer NOT NULL,
    tipo_presentacion_id integer NOT NULL,
    unidad_medida_id integer NOT NULL,
    CONSTRAINT notificacion_presentacion_pk PRIMARY KEY (id),
    CONSTRAINT notificacion_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_presentacion_fk FOREIGN KEY (tipo_presentacion_id)
        REFERENCES siges.tipo_presentacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_unidad_fk FOREIGN KEY (unidad_medida_id)
        REFERENCES siges.unidad_medida (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
CREATE INDEX notificacion_presentacion_id_i
ON siges.notificacion_presentacion(id);


-- NOTIFICACION_ACCION
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_accion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.notificacion_accion
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_accion_id_seq'::regclass),
    detalle character varying(255) COLLATE pg_catalog."default",
    fecha_creacion timestamp without time zone NOT NULL,
    notificacion_id integer NOT NULL,
    CONSTRAINT notificacion_accion_pk PRIMARY KEY (id),
    CONSTRAINT accion_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION_CERRADA
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_cerrada_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.notificacion_cerrada
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_cerrada_id_seq'::regclass),
    detalle character varying(255) COLLATE pg_catalog."default",
    fecha_creacion timestamp without time zone NOT NULL,
    entidad_id integer NOT NULL,
    notificacion_id integer NOT NULL,
    CONSTRAINT notificacion_cerrada_pk PRIMARY KEY (id),
    CONSTRAINT cerrada_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT cerrada_entidad_fk FOREIGN KEY (entidad_id)
        REFERENCES siges.entidad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION_DECLARACION
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_declaracion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.notificacion_declaracion
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_declaracion_id_seq'::regclass),
    detalle character varying(255) COLLATE pg_catalog."default",
    fecha_creacion timestamp without time zone NOT NULL,
    entidad_id integer NOT NULL,
    notificacion_id integer NOT NULL,
	flag_leido boolean NOT NULL,
    CONSTRAINT notificacion_declaracion_pk PRIMARY KEY (id),
    CONSTRAINT declaracion_entidad_fk FOREIGN KEY (entidad_id)
        REFERENCES siges.entidad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT declaracion_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION_DISCREPANCIA
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_discrepancia_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;	
CREATE TABLE IF NOT EXISTS siges.notificacion_discrepancia
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_discrepancia_id_seq'::regclass),
    detalle character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    flag_leido boolean,
    notificacion_id integer NOT NULL,
    CONSTRAINT notificacion_discrepancia_pk PRIMARY KEY (id),
    CONSTRAINT discrepancia_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION_FASE
CREATE TABLE IF NOT EXISTS siges.notificacion_fase
(
    fase_id integer NOT NULL,
    notificacion_id integer NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    flag_activo boolean NOT NULL,
    mensaje text COLLATE pg_catalog."default",
    CONSTRAINT notificacion_fase_pk PRIMARY KEY (fase_id, notificacion_id),
    CONSTRAINT fase_fk FOREIGN KEY (fase_id)
        REFERENCES siges.fase (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- NOTIFICACION_NO_DECLARACION
CREATE SEQUENCE IF NOT EXISTS siges.notificacion_no_declaracion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE IF NOT EXISTS siges.notificacion_no_declaracion
(
    id integer NOT NULL DEFAULT nextval('siges.notificacion_no_declaracion_id_seq'::regclass),
    detalle character varying(255) COLLATE pg_catalog."default",
    fecha_creacion timestamp without time zone NOT NULL,
    entidad_id integer NOT NULL,
    notificacion_id integer NOT NULL,
    CONSTRAINT notificacion_no_declaracion_pk PRIMARY KEY (id),
    CONSTRAINT nodeclaracion_entidad_fk FOREIGN KEY (entidad_id)
        REFERENCES siges.entidad (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT nodeclaracion_notificacion_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);







