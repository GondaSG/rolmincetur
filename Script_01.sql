
-- SCRIPT SCHEMA SIGES //CREACION DE TABLAS

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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT categoria_alimento_pk PRIMARY KEY (id)
);

CREATE INDEX categoria_alimento_id_i
ON siges.categoria_alimento(id);
CREATE INDEX categoria_alimento_nombre_i
ON siges.categoria_alimento(nombre);

--DATA

INSERT INTO siges.categoria_alimento(nombre)VALUES ('Leche y productos lácteos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Helados y mezclas para helados');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Productos grasos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Productos deshidratados, liofilizados o concentrados y mezclas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Granos de cereales, leguminosas y derivados');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Azúcares, mieles y productos similares');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Productos de confitería y derivados del cacao');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Productos de panadería, pastelería, galletería y otros');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Alimentos para Regímenes especiales');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Carnes y productos cárnicos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Productos hidrobiológicos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Huevos y ovoproductos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Especias, condimentos y salsas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Frutas, hortalizas y frutos secos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Comidas preparadas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Bebidas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Estimulantes y fruitivos');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Conservas y semiconservas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Bebidas alcohólicas');
INSERT INTO siges.categoria_alimento(nombre)VALUES ('Piensos');


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
    nombre character varying(255) COLLATE pg_catalog."default",
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
    descripcion character varying(200) COLLATE pg_catalog."default",
    nombre character varying(200) COLLATE pg_catalog."default",
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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT ciudad_pk PRIMARY KEY (id)
);

CREATE INDEX ciudad_id_i
ON siges.ciudad(id);
CREATE INDEX ciudad_nombre_i
ON siges.ciudad(nombre);


INSERT INTO siges.ciudad(nombre,descripcion)VALUES ('Lima', 'ciudad01');
INSERT INTO siges.ciudad(nombre,descripcion)VALUES ('Arequipa', 'ciudad02');

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
    nombre character varying(400) COLLATE pg_catalog."default",
    CONSTRAINT entidad_pk PRIMARY KEY (id)
);

CREATE INDEX entidad_id_i
ON siges.entidad(id);
CREATE INDEX entidad_nombre_i
ON siges.entidad(nombre);

INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('COMPIAL', 'Comisión Multisectorial Permanente de Inocuidad Alimentaria');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('DIGESA', 'Dirección General de Salud Ambiental e Inocuidad Alimentaria del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('SENASA', 'Servicio Nacional de Sanidad Agraria del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('SANIPES', 'Organismo Nacional de Sanidad Pesquera del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('MINCETUR', 'Ministerio de Comercio Exterior y Turismo del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('RREE', 'Ministerio de Relaciones Exteriores');
	
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
    nombre character varying(200) COLLATE pg_catalog."default",
    origen character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT fuente_notificacion_pk PRIMARY KEY (id)
);

CREATE INDEX fuente_notificacion_id_i
ON siges.fuente_notificacion(id);
CREATE INDEX fuente_notificacion_nombre_i
ON siges.fuente_notificacion(nombre);


INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Control Oficial', 'Nacional');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Laboratorios Acreditados Externos', 'Nacional');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Otras Instituciones Locales', 'Nacional');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Ciudadanía', 'Nacional');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('ONG', 'Nacional');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('INFOSAN', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('RAFF', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('USDA', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('FDA', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Embajada', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Vigilancia', 'Extranjero');
INSERT INTO siges.fuente_notificacion(nombre, origen)VALUES ('Otro', 'Otros países');


--LUGAR EVENTO

CREATE SEQUENCE IF NOT EXISTS siges.lugar_evento_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
	
CREATE TABLE IF NOT EXISTS siges.lugar_evento
(
    id integer NOT NULL DEFAULT nextval('siges.lugar_evento_id_seq'::regclass),
    nombre character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT lugar_evento_pk PRIMARY KEY (id)
);

CREATE INDEX lugar_evento_id_i
ON siges.lugar_evento(id);
CREATE INDEX lugar_evento_nombre_i
ON siges.lugar_evento(nombre);

INSERT INTO siges.lugar_evento(nombre)VALUES ('Nacional');
INSERT INTO siges.lugar_evento(nombre)VALUES ('Extranjero');


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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT origen_notificacion_pk PRIMARY KEY (id)
);

CREATE INDEX origen_notificacion_id_i
ON siges.origen_notificacion(id);
CREATE INDEX origen_notificacion_nombre_i
ON siges.origen_notificacion(nombre);


INSERT INTO siges.origen_notificacion(nombre)VALUES ('Nacional');
INSERT INTO siges.origen_notificacion(nombre)VALUES ('Internacional');

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
    nombre character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT pais_pk PRIMARY KEY (id)
);

CREATE INDEX pais_id_i
ON siges.pais(id);
CREATE INDEX pais_nombre_i
ON siges.pais(nombre);

INSERT INTO siges.pais(nombre,descripcion)VALUES ('Perú', 'país01');
INSERT INTO siges.pais(nombre,descripcion)VALUES ('Brasil', 'país02');


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
    nombre character varying(80) COLLATE pg_catalog."default",
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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT tipo_alimento_pk PRIMARY KEY (id)
);

CREATE INDEX tipo_alimento_id_i
ON siges.tipo_alimento(id);
CREATE INDEX tipo_alimento_nombre_i
ON siges.tipo_alimento(nombre);	

INSERT INTO siges.tipo_alimento(nombre)VALUES ('Vitaminas');
INSERT INTO siges.tipo_alimento(nombre)VALUES ('Proteinas');

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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT tipo_notificacion_pk PRIMARY KEY (id)
);

CREATE INDEX tipo_notificacion_id_i
ON siges.tipo_notificacion(id);
CREATE INDEX tipo_notificacion_nombre_i
ON siges.tipo_notificacion(nombre);	

INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Alerta', 'Descripcion01');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Información', 'Descripcion02');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Rechazo', 'Descripcion03');


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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT tipo_presentacion_pk PRIMARY KEY (id)
);

CREATE INDEX tipo_presentacion_id_i
ON siges.tipo_presentacion(id);
CREATE INDEX tipo_presentacion_nombre_i
ON siges.tipo_presentacion(nombre);	


INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Bolsa');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Tarro');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Lata');


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
    nombre character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT unidad_medida_pk PRIMARY KEY (id)
);
	
CREATE INDEX unidad_medida_id_i
ON siges.unidad_medida(id);
CREATE INDEX unidad_medida_nombre_i
ON siges.unidad_medida(nombre);	

INSERT INTO siges.unidad_medida(nombre)VALUES ('Tonelada');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Kilos');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Litros');	

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
    codigo_generado character varying(250) COLLATE pg_catalog."default",
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
    tipo_peligro_id integer,
    CONSTRAINT notificacion_pk PRIMARY KEY (id),
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
    flag_active boolean NOT NULL,
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
    cantidad double precision,
    lote character varying(255) COLLATE pg_catalog."default",
    notificacion_id integer,
    CONSTRAINT notificacion_lote_pk PRIMARY KEY (id),
    CONSTRAINT notificion_lote_noti_fk FOREIGN KEY (notificacion_id)
        REFERENCES siges.notificacion (id) MATCH SIMPLE
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
    volumen double precision,
    notificacion_id integer,
    tipo_presentacion_id integer,
    unidad_medida_id integer,
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


--TABLA ASIGNACION
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Aprobar Notificaciones', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Notificar Discrepancias', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Listar notificaciones, visualiza las notificaciones de todas las entidades', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Ver acciones de las notificaciones', 'Menu', 1);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Comunicar cierre de notificaciones', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Gestión de Roles', 'Menu', 1);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Gestión de Usuarios', 'Menu', 1);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Mantenimiento de Entidades y Categoría de Alimentos', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Ver Dashboard del Sistema de todas las entidades', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Bandeja Alerta Sanitaria de todas las entidades', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Mi cuenta', 'Menu', 1);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Visualizar listado de Notificaciones de todas las entidades', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Ver detalle de notificaciones sin editar', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Ver detalle de notificaciones', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Listar notificaciones de su competencia', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Declarar competencias y No Competencias', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Registrar acciones sobre la notificación de su competencia', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Cerrar Notificaciones de su competencia', 'Boton', 2);
INSERT INTO siges.asignacion(nombre, tipo_nombre, tipo_id)	VALUES ('Ver Dashboard del Sistema sobre notificaciones de su competencia', 'Boton', 2);