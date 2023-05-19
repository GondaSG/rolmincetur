
-- TABLE ASIGNACION
COMMENT ON TABLE siges.asignacion IS 'Tabla que contiene todas las asignaciones.';
COMMENT ON COLUMN siges.asignacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.asignacion.nombre IS 'Campo que almacena el nombre del tipo de asignación';
COMMENT ON COLUMN siges.asignacion.tipo_nombre IS 'Campo que almacena el tipo de nombre del asignación';
COMMENT ON COLUMN siges.asignacion.tipo_id IS 'Campo que almacena el identificador del tipo de asignación';
COMMENT ON COLUMN siges.asignacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la asignación';
COMMENT ON COLUMN siges.asignacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la asignación';
COMMENT ON COLUMN siges.asignacion.usuario_creacion IS 'Campo que almacena el usuario que creo la asignación';
COMMENT ON COLUMN siges.asignacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la asignación';

-- TABLE CATEGORIA_ALIMENTO
COMMENT ON TABLE siges.categoria_alimento IS 'Tabla que contiene todas las categorías de alimento.';
COMMENT ON COLUMN siges.categoria_alimento.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.categoria_alimento.descripcion IS 'Campo que almacena la descripción de la categoría de alimento';
COMMENT ON COLUMN siges.categoria_alimento.nombre IS 'Campo que almacena el nombre del categoría de alimento';
COMMENT ON COLUMN siges.categoria_alimento.fecha_creacion IS 'Campo que almacena la fecha de creación de la categoría de alimento';
COMMENT ON COLUMN siges.categoria_alimento.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la categoría de alimento';
COMMENT ON COLUMN siges.categoria_alimento.usuario_creacion IS 'Campo que almacena el usuario que creo la categoría de alimento';
COMMENT ON COLUMN siges.categoria_alimento.usuario_modificacion IS 'Campo que almacena el usuario que modifico la categoría de alimento';

-- TABLE CIUDAD
COMMENT ON TABLE siges.ciudad IS 'Tabla que contiene todas las ciudades / puertos.';
COMMENT ON COLUMN siges.ciudad.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.ciudad.nombre IS 'Campo que almacena el nombre de la ciudad';
COMMENT ON COLUMN siges.ciudad.estado IS 'Campo que almacena el estado de la ciudad';
COMMENT ON COLUMN siges.ciudad.modo_transporte_id IS 'Campo que almacena el modo de transporte de la ciudad';
COMMENT ON COLUMN siges.ciudad.nombre_abreviado IS 'Campo que almacena el nombre abreviado de la ciudad';
COMMENT ON COLUMN siges.ciudad.puerto IS 'Campo que almacena el nombre abreviado del puerto';
COMMENT ON COLUMN siges.ciudad.secuencia_pais_iso IS 'Campo que almacena la secuencia del pais';
COMMENT ON COLUMN siges.ciudad.pais_id IS 'Campo que almacena el identificador del país de la tabla';
COMMENT ON COLUMN siges.ciudad.fecha_creacion IS 'Campo que almacena la fecha de creación de la ciudad';
COMMENT ON COLUMN siges.ciudad.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la ciudad';
COMMENT ON COLUMN siges.ciudad.usuario_creacion IS 'Campo que almacena el usuario que creo la ciudad';
COMMENT ON COLUMN siges.ciudad.usuario_modificacion IS 'Campo que almacena el usuario que modifico la ciudad';

-- TABLE ENTIDAD
COMMENT ON TABLE siges.entidad IS 'Tabla que contiene todas las entidades del sistema.';
COMMENT ON COLUMN siges.entidad.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.entidad.nombre IS 'Campo que almacena el nombre de la entidad';
COMMENT ON COLUMN siges.entidad.abreviatura IS 'Campo que almacena la abreviatura de la entidad';
COMMENT ON COLUMN siges.entidad.fecha_creacion IS 'Campo que almacena la fecha de creación de la entidad';
COMMENT ON COLUMN siges.entidad.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la entidad';
COMMENT ON COLUMN siges.entidad.usuario_creacion IS 'Campo que almacena el usuario que creo la entidad';
COMMENT ON COLUMN siges.entidad.usuario_modificacion IS 'Campo que almacena el usuario que modifico la entidad';

-- TABLE ESTADO
COMMENT ON TABLE siges.estado IS 'Tabla que contiene todos los estados de las notificaciones.';
COMMENT ON COLUMN siges.estado.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.estado.nombre IS 'Campo que almacena el nombre de los estados de las notificaciones';
COMMENT ON COLUMN siges.estado.fecha_creacion IS 'Campo que almacena la fecha de creación del estado';
COMMENT ON COLUMN siges.estado.fecha_modificacion IS 'Campo que almacena la fecha de modificación del estado';
COMMENT ON COLUMN siges.estado.usuario_creacion IS 'Campo que almacena el usuario que creo el estado';
COMMENT ON COLUMN siges.estado.usuario_modificacion IS 'Campo que almacena el usuario que modifico el estado';

-- TABLE FASE
COMMENT ON TABLE siges.fase IS 'Tabla que contiene todas las fases.';
COMMENT ON COLUMN siges.fase.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.fase.nombre IS 'Campo que almacena el nombre de los fase';
COMMENT ON COLUMN siges.fase.fecha_creacion IS 'Campo que almacena la fecha de creación de la fase';
COMMENT ON COLUMN siges.fase.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la fase';
COMMENT ON COLUMN siges.fase.usuario_creacion IS 'Campo que almacena el usuario que creo la fase';
COMMENT ON COLUMN siges.fase.usuario_modificacion IS 'Campo que almacena el usuario que modifico la fase';

-- TABLE FUENTE_NOTIFICACION
COMMENT ON TABLE siges.fuente_notificacion IS 'Tabla que contiene todas las fuentes de notificación.';
COMMENT ON COLUMN siges.fuente_notificacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.fuente_notificacion.nombre IS 'Campo que almacena el nombre de la fuente de notificación.';
COMMENT ON COLUMN siges.fuente_notificacion.tipo_id IS 'Campo que almacena el identificador del tipo de fuente de notificación.';
COMMENT ON COLUMN siges.fuente_notificacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la fuente de notificación';
COMMENT ON COLUMN siges.fuente_notificacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la fuente de notificación';
COMMENT ON COLUMN siges.fuente_notificacion.usuario_creacion IS 'Campo que almacena el usuario que creo la fuente de notificación';
COMMENT ON COLUMN siges.fuente_notificacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la fuente de notificación';

-- TABLE NOTIFICACION
COMMENT ON TABLE siges.notificacion IS 'Tabla principal de notificaciones';
COMMENT ON COLUMN siges.notificacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion.codigo_generado IS 'Campo que almacena el código generado de la notificación';
COMMENT ON COLUMN siges.notificacion.dato_exportador IS 'Campo que almacena el dato exportador';
COMMENT ON COLUMN siges.notificacion.dato_importador IS 'Campo que almacena el dato importador';
COMMENT ON COLUMN siges.notificacion.fecha_evento IS 'Campo que almacena la fecha evento de la notificación';
COMMENT ON COLUMN siges.notificacion.fecha_notificacion IS 'Campo que almacena la fecha de notificación de la notificación';
COMMENT ON COLUMN siges.notificacion.fecha_produccion IS 'Campo que almacena la fecha de produccion de la notificación';
COMMENT ON COLUMN siges.notificacion.fecha_vencimiento IS 'Campo que almacena la fecha de vencimiento de la notificación';
COMMENT ON COLUMN siges.notificacion.flag_afectado IS 'Campo que indica si está afectado';
COMMENT ON COLUMN siges.notificacion.flag_digesa IS 'Campo que indica si es digesa';
COMMENT ON COLUMN siges.notificacion.flag_sanipes IS 'Campo que indica si es sanipes';
COMMENT ON COLUMN siges.notificacion.flag_senasa IS 'Campo que indica si es senasa';
COMMENT ON COLUMN siges.notificacion.nombre_alimento IS 'Campo donde se indica el nombre del alimento';
COMMENT ON COLUMN siges.notificacion.productor IS 'Campo donde se indica el nombre del productor';
COMMENT ON COLUMN siges.notificacion.titulo IS 'Campo que almacena el título de la notificación';
COMMENT ON COLUMN siges.notificacion.categoria_alimento_id IS 'Campo que almacena el identificador de la categoría de alimento';
COMMENT ON COLUMN siges.notificacion.ciudad_id IS 'Campo que almacena la fecha de identificador de la ciudad';
COMMENT ON COLUMN siges.notificacion.fuente_notificacion_id IS 'Campo que almacena el identificador de la fuente de la notificación';
COMMENT ON COLUMN siges.notificacion.origen_notificacion_id IS 'Campo que almacena el identificador del origen de notificación';
COMMENT ON COLUMN siges.notificacion.pais_id IS 'Campo que almacena el identificador del país';
COMMENT ON COLUMN siges.notificacion.tipo_alimento_id IS 'Campo que almacena el identificador del tipo de alimento';
COMMENT ON COLUMN siges.notificacion.tipo_notificacion_id IS 'Campo que almacena el identificador del tipo de notificación ';
COMMENT ON COLUMN siges.notificacion.flag_biologico IS 'Campo donde se indica si es biológico';
COMMENT ON COLUMN siges.notificacion.flag_fisico IS 'Campo donde se indica si es Físico';
COMMENT ON COLUMN siges.notificacion.flag_otro IS 'Campo donde se indica si pertenece a otro';
COMMENT ON COLUMN siges.notificacion.flag_quimico IS 'Campo donde se indica si es Químico';
COMMENT ON COLUMN siges.notificacion.comentario IS 'Campo que almacena el comentario de la notificación';
COMMENT ON COLUMN siges.notificacion.peligro_especifico IS 'Campo que almacena el peligro especifico de la notificación';
COMMENT ON COLUMN siges.notificacion.flag_activo IS 'Campo donde se indica si está activo';
COMMENT ON COLUMN siges.notificacion.entidad_id IS 'Campo que almacena el identificador de la entidad';
COMMENT ON COLUMN siges.notificacion.flag_nacional IS 'Campo donde se indica si es nacional';
COMMENT ON COLUMN siges.notificacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificacion';
COMMENT ON COLUMN siges.notificacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificacion';
COMMENT ON COLUMN siges.notificacion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificacion';
COMMENT ON COLUMN siges.notificacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificacion';

-- TABLE NOTIFICACION_ACCION
COMMENT ON TABLE siges.notificacion_accion IS 'Tabla que contiene las acciones de las notificaciones.';
COMMENT ON COLUMN siges.notificacion_accion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_accion.detalle IS 'Campo que almacena el detalle de la notificación de acción';
COMMENT ON COLUMN siges.notificacion_accion.notificacion_id IS 'Campo que almacena el identificador de la notificación de acción';
COMMENT ON COLUMN siges.notificacion_accion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación de acción';
COMMENT ON COLUMN siges.notificacion_accion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación de acción';
COMMENT ON COLUMN siges.notificacion_accion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación de acción';
COMMENT ON COLUMN siges.notificacion_accion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación de acción';

-- TABLE NOTIFICACION_CERRADA
COMMENT ON TABLE siges.notificacion_cerrada IS 'Tabla que contiene las notificaciones que son cerradas por cada entidad.';
COMMENT ON COLUMN siges.notificacion_cerrada.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_cerrada.detalle IS 'Campo que almacena el detalle de la notificación cerrada';
COMMENT ON COLUMN siges.notificacion_cerrada.entidad_id IS 'Campo que almacena el identificador de la identidad';
COMMENT ON COLUMN siges.notificacion_cerrada.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_cerrada.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_cerrada.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_cerrada.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_cerrada.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación cerrada';

-- TABLE NOTIFICACION_DECLARACION
COMMENT ON TABLE siges.notificacion_declaracion IS 'Tabla que contiene las notificaciones de declaración.';
COMMENT ON COLUMN siges.notificacion_declaracion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_declaracion.detalle IS 'Campo que almacena el detalle de la notificación de declaración';
COMMENT ON COLUMN siges.notificacion_declaracion.entidad_id IS 'Campo que almacena el identificador de la identidad';
COMMENT ON COLUMN siges.notificacion_declaracion.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_declaracion.flag_leido IS 'Campo que indica si fue leído';
COMMENT ON COLUMN siges.notificacion_declaracion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_declaracion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_declaracion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_declaracion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_DISCREPANCIA
COMMENT ON TABLE siges.notificacion_discrepancia IS 'Tabla que contiene las notificaciones de discrepancia.';
COMMENT ON COLUMN siges.notificacion_discrepancia.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_discrepancia.detalle IS 'Campo que almacena el detalle de la notificación de discrepancia';
COMMENT ON COLUMN siges.notificacion_discrepancia.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_discrepancia.flag_leido IS 'Campo que indica si fue leído';
COMMENT ON COLUMN siges.notificacion_discrepancia.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_discrepancia.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_discrepancia.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_discrepancia.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_DOCUMENTO
COMMENT ON TABLE siges.notificacion_documento IS 'Tabla que contiene el documento de las notificaciones.';
COMMENT ON COLUMN siges.notificacion_documento.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_documento.nombre IS 'Campo que almacena el nombre del documento de la notificación';
COMMENT ON COLUMN siges.notificacion_documento.numero_documento IS 'Campo que almacena el numero de documento de la notificación';
COMMENT ON COLUMN siges.notificacion_documento.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_documento.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_documento.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_documento.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_documento.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_ESTADO
COMMENT ON TABLE siges.notificacion_estado IS 'Tabla que contiene las notificaciones de estado.';
COMMENT ON COLUMN siges.notificacion_estado.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_estado.estado_id IS 'Campo que almacena el identificador de estado';
COMMENT ON COLUMN siges.notificacion_estado.flag_activo IS 'Campo que indica si está activo';
COMMENT ON COLUMN siges.notificacion_estado.flag_leido IS 'Campo que indica si fue leído';
COMMENT ON COLUMN siges.notificacion_estado.mensaje IS 'Campo que almacena el mensaje de la notificación de estado';
COMMENT ON COLUMN siges.notificacion_estado.fecha_creacion IS 'Campo que almacena la fecha de creación del estado';
COMMENT ON COLUMN siges.notificacion_estado.fecha_modificacion IS 'Campo que almacena la fecha de modificación del estado';
COMMENT ON COLUMN siges.notificacion_estado.usuario_creacion IS 'Campo que almacena el usuario que creo el estado';
COMMENT ON COLUMN siges.notificacion_estado.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación de estado';

-- TABLE NOTIFICACION_FASE
COMMENT ON TABLE siges.notificacion_fase IS 'Tabla que contiene las notificaciones de fase.';
COMMENT ON COLUMN siges.notificacion_fase.fase_id IS 'Campo que almacena el identificador de la fase';
COMMENT ON COLUMN siges.notificacion_fase.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_fase.flag_activo IS 'Campo que indica si está activo';
COMMENT ON COLUMN siges.notificacion_fase.mensaje IS 'Campo que almacena el mensaje de la notificación de fase';
COMMENT ON COLUMN siges.notificacion_fase.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_fase.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_fase.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_fase.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_LOTE
COMMENT ON TABLE siges.notificacion_lote IS 'Tabla que contiene las notificaciones de lote.';
COMMENT ON COLUMN siges.notificacion_lote.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_lote.lote IS 'Campo que almacena el nombre de lote';
COMMENT ON COLUMN siges.notificacion_lote.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_lote.unidad_medida_id IS 'Campo que almacena el identificador de la unidad de medida';
COMMENT ON COLUMN siges.notificacion_lote.cantidad IS 'Campo que almacena la cantidad de lote';
COMMENT ON COLUMN siges.notificacion_lote.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_lote.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_lote.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_lote.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_NO_DECLARACION
COMMENT ON TABLE siges.notificacion_no_declaracion IS 'Tabla que contiene las notificaciones no declaradas.';
COMMENT ON COLUMN siges.notificacion_no_declaracion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_no_declaracion.detalle IS 'Campo que almacena el detalle de la notificación no declarada';
COMMENT ON COLUMN siges.notificacion_no_declaracion.entidad_id IS 'Campo que almacena el identificador de la entidad';
COMMENT ON COLUMN siges.notificacion_no_declaracion.notificacion_id IS 'Campo que almacena el identificador de la notificación';
COMMENT ON COLUMN siges.notificacion_no_declaracion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_no_declaracion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_no_declaracion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_no_declaracion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE NOTIFICACION_PRESENTACION
COMMENT ON TABLE siges.notificacion_presentacion IS 'Tabla que contiene las notificaciones de presentación';
COMMENT ON COLUMN siges.notificacion_presentacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.notificacion_presentacion.notificacion_id IS 'Campo que almacena el indentificador de la notificación';
COMMENT ON COLUMN siges.notificacion_presentacion.tipo_presentacion_id IS 'Campo que almacena el identificador del tipo de presentación';
COMMENT ON COLUMN siges.notificacion_presentacion.unidad_medida_id IS 'Campo que almacena el identificador de la unidad de medida';
COMMENT ON COLUMN siges.notificacion_presentacion.volumen IS 'Campo de volumen de la notificación de presentación';
COMMENT ON COLUMN siges.notificacion_presentacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.notificacion_presentacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.notificacion_presentacion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.notificacion_presentacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la notificación';

-- TABLE ORIGEN_NOTIFICACION
COMMENT ON TABLE siges.origen_notificacion IS 'Tabla que contiene el origen de las notificaciones.';
COMMENT ON COLUMN siges.origen_notificacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.origen_notificacion.descripcion IS 'Campo que almacena la descripción del origen de notificación';
COMMENT ON COLUMN siges.origen_notificacion.nombre IS 'Campo que almacena el nombre del origen de notificación';
COMMENT ON COLUMN siges.origen_notificacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la notificación';
COMMENT ON COLUMN siges.origen_notificacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la notificación';
COMMENT ON COLUMN siges.origen_notificacion.usuario_creacion IS 'Campo que almacena el usuario que creo la notificación';
COMMENT ON COLUMN siges.origen_notificacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico el origen de notificación';

-- TABLE PAIS
COMMENT ON TABLE siges.pais IS 'Tabla que contiene los países';
COMMENT ON COLUMN siges.pais.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.pais.descripcion IS 'Campo que almacena la descripción del país';
COMMENT ON COLUMN siges.pais.nombre IS 'Campo que almacena el nombre del país';
COMMENT ON COLUMN siges.pais.iso_alfa2 IS 'Campo que almacena el iso alfa 2 de notificación';
COMMENT ON COLUMN siges.pais.iso_alfa3 IS 'Campo que almacena el iso alfa 3 de notificación';
COMMENT ON COLUMN siges.pais.fecha_creacion IS 'Campo que almacena la fecha de creación del país';
COMMENT ON COLUMN siges.pais.fecha_modificacion IS 'Campo que almacena la fecha de modificación del país';
COMMENT ON COLUMN siges.pais.usuario_creacion IS 'Campo que almacena el usuario que creo el país';
COMMENT ON COLUMN siges.pais.usuario_modificacion IS 'Campo que almacena el usuario que modifico el país';

-- TABLE ROL
COMMENT ON TABLE siges.rol IS 'Tabla que contiene los roles';
COMMENT ON COLUMN siges.rol.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.rol.descripcion IS 'Campo que almacena la descripción del rol';
COMMENT ON COLUMN siges.rol.nombre IS 'Campo que almacena el nombre del rol';
COMMENT ON COLUMN siges.rol.fecha_creacion IS 'Campo que almacena la fecha de creación del rol';
COMMENT ON COLUMN siges.rol.fecha_modificacion IS 'Campo que almacena la fecha de modificación del rol';
COMMENT ON COLUMN siges.rol.usuario_creacion IS 'Campo que almacena el usuario que creo el rol';
COMMENT ON COLUMN siges.rol.usuario_modificacion IS 'Campo que almacena el usuario que modifico el rol';

-- TABLE ROL_ASIGNACION
COMMENT ON TABLE siges.rol_asignacion IS 'Tabla que contiene los roles de asignacion';
COMMENT ON COLUMN siges.rol_asignacion.rol_id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.rol_asignacion.asignacion_id IS 'Campo que almacena el identificador del rol de asignación';
COMMENT ON COLUMN siges.rol_asignacion.fecha_creacion IS 'Campo que almacena la fecha de creación del rol de asignación';
COMMENT ON COLUMN siges.rol_asignacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación del rol de asignación';
COMMENT ON COLUMN siges.rol_asignacion.usuario_creacion IS 'Campo que almacena el usuario que creo el rol de asignación';
COMMENT ON COLUMN siges.rol_asignacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico el rol de asignación';

-- TABLE TIPO_ALIMENTO
COMMENT ON TABLE siges.tipo_alimento IS 'Tabla que contiene los tipos de alimento';
COMMENT ON COLUMN siges.tipo_alimento.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_alimento.descripcion IS 'Campo que almacena la descripción del tipo de alimento';
COMMENT ON COLUMN siges.tipo_alimento.nombre IS 'Campo que almacena el nombre del tipo de alimento';
COMMENT ON COLUMN siges.tipo_alimento.fecha_creacion IS 'Campo que almacena la fecha de creación del tipo de alimento';
COMMENT ON COLUMN siges.tipo_alimento.fecha_modificacion IS 'Campo que almacena la fecha de modificación del tipo de alimento';
COMMENT ON COLUMN siges.tipo_alimento.usuario_creacion IS 'Campo que almacena el usuario que creo el tipo de alimento';
COMMENT ON COLUMN siges.tipo_alimento.usuario_modificacion IS 'Campo que almacena el usuario que modifico el tipo de alimento';

-- TABLE TIPO_DOCUMENTO
COMMENT ON TABLE siges.tipo_documento IS 'Tabla que contiene los tipos de documento';
COMMENT ON COLUMN siges.tipo_documento.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_documento.activo_uo IS 'Campo que almacena si está activo el documento';
COMMENT ON COLUMN siges.tipo_documento.descripcion IS 'Campo que almacena la descripción del documento';
COMMENT ON COLUMN siges.tipo_documento.doc_vuce IS 'Campo que almacena el documento vuce';
COMMENT ON COLUMN siges.tipo_documento.documento_tipo_digemid IS 'Campo que almacena si el documento es tipo digemid';
COMMENT ON COLUMN siges.tipo_documento.documento_tipo_produce IS 'Campo que almacena si el documento es tipo produce';
COMMENT ON COLUMN siges.tipo_documento.documento_tipo_sunat IS 'Campo que almacena si el documento es tipo sunat';
COMMENT ON COLUMN siges.tipo_documento.equivalencia_sunat_vuce IS 'Campo que almacena la equivalencia sunat';
COMMENT ON COLUMN siges.tipo_documento.estado IS 'Campo que almacena el estado del documento';
COMMENT ON COLUMN siges.tipo_documento.persona_natural IS 'Campo que almacena si el documento es de persona natural';
COMMENT ON COLUMN siges.tipo_documento.fecha_creacion IS 'Campo que almacena la fecha de creación del tipo de documento';
COMMENT ON COLUMN siges.tipo_documento.fecha_modificacion IS 'Campo que almacena la fecha de modificación del tipo de documento';
COMMENT ON COLUMN siges.tipo_documento.usuario_creacion IS 'Campo que almacena el usuario que creo el tipo de documento';
COMMENT ON COLUMN siges.tipo_documento.usuario_modificacion IS 'Campo que almacena el usuario que modifico el tipo de documento';

-- TABLE TIPO_NOTIFICACION
COMMENT ON TABLE siges.tipo_notificacion IS 'Tabla que contiene los tipos de notificacion';
COMMENT ON COLUMN siges.tipo_notificacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_notificacion.descripcion IS 'Campo que almacena la descripción del tipo de notificación';
COMMENT ON COLUMN siges.tipo_notificacion.nombre IS 'Campo que almacena el nombre del tipo de notificación';
COMMENT ON COLUMN siges.tipo_notificacion.fecha_creacion IS 'Campo que almacena la fecha de creación del tipo de notificación';
COMMENT ON COLUMN siges.tipo_notificacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación del tipo de notificación';
COMMENT ON COLUMN siges.tipo_notificacion.usuario_creacion IS 'Campo que almacena el usuario que creo el tipo de notificación';
COMMENT ON COLUMN siges.tipo_notificacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico el tipo de notificación';

-- TABLE TIPO_PRESENTACION
COMMENT ON TABLE siges.tipo_presentacion IS 'Tabla que contiene los tipos de presentación';
COMMENT ON COLUMN siges.tipo_presentacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_presentacion.nombre IS 'Campo que almacena el nombre del tipo de presentación';
COMMENT ON COLUMN siges.tipo_presentacion.fecha_creacion IS 'Campo que almacena la fecha de creación del tipo de presentación';
COMMENT ON COLUMN siges.tipo_presentacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación del tipo de presentación';
COMMENT ON COLUMN siges.tipo_presentacion.usuario_creacion IS 'Campo que almacena el usuario que creo el tipo de presentación';
COMMENT ON COLUMN siges.tipo_presentacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico el tipo de presentación';

-- TABLE TIPO_USUARIO
COMMENT ON TABLE siges.tipo_usuario IS 'Tabla que contiene los tipos de usuario';
COMMENT ON COLUMN siges.tipo_usuario.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_usuario.nombre IS 'Campo que almacena el nombre del tipo de usuario';
COMMENT ON COLUMN siges.tipo_usuario.fecha_creacion IS 'Campo que almacena la fecha de creación del tipo de usuario';
COMMENT ON COLUMN siges.tipo_usuario.fecha_modificacion IS 'Campo que almacena la fecha de modificación del tipo de usuario';
COMMENT ON COLUMN siges.tipo_usuario.usuario_creacion IS 'Campo que almacena el usuario que creo el tipo de usuario';
COMMENT ON COLUMN siges.tipo_usuario.usuario_modificacion IS 'Campo que almacena el usuario que modifico el tipo de usuario';

-- TABLE UNIDAD_MEDIDA
COMMENT ON TABLE siges.tipo_notificacion IS 'Tabla que contiene las unidades de medida';
COMMENT ON COLUMN siges.tipo_notificacion.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.tipo_notificacion.descripcion IS 'Campo que almacena la descripción de la unidad de medida';
COMMENT ON COLUMN siges.tipo_notificacion.nombre IS 'Campo que almacena el nombre de la unidad de medida';
COMMENT ON COLUMN siges.tipo_notificacion.fecha_creacion IS 'Campo que almacena la fecha de creación de la unidad de medida';
COMMENT ON COLUMN siges.tipo_notificacion.fecha_modificacion IS 'Campo que almacena la fecha de modificación de la unidad de medida';
COMMENT ON COLUMN siges.tipo_notificacion.usuario_creacion IS 'Campo que almacena el usuario que creo la unidad de medida';
COMMENT ON COLUMN siges.tipo_notificacion.usuario_modificacion IS 'Campo que almacena el usuario que modifico la unidad de medida';

-- TABLE USUARIO
COMMENT ON TABLE siges.usuario IS 'Tabla que contiene la información de los usuarios del sistema.';
COMMENT ON COLUMN siges.usuario.id IS 'Campo que almacena el identificador de la tabla';
COMMENT ON COLUMN siges.usuario.correo IS 'Campo que almacena el correo del usuario';
COMMENT ON COLUMN siges.usuario.nombre IS 'Campo que almacena el nombre del usuario';
COMMENT ON COLUMN siges.usuario.telefono IS 'Campo que almacena el teléfono del usuario';
COMMENT ON COLUMN siges.usuario.entidad_id IS 'Campo que almacena el identificador de la entidad';
COMMENT ON COLUMN siges.usuario.rol_id IS 'Campo que almacena el identificador del rol';
COMMENT ON COLUMN siges.usuario.ruc IS 'Campo que almacena el ruc del usuario';
COMMENT ON COLUMN siges.usuario.tipo_usuario_id IS 'Campo que almacena el identificador del tipo de usuario';
COMMENT ON COLUMN siges.usuario.codigo IS 'Campo que almacena el código del usuario';
COMMENT ON COLUMN siges.usuario.tipo_documento_id IS 'Campo que almacena el identificador del tipo de documento';
COMMENT ON COLUMN siges.usuario.fecha_creacion IS 'Campo que almacena la fecha de creación del usuario';
COMMENT ON COLUMN siges.usuario.fecha_modificacion IS 'Campo que almacena la fecha de modificación del usuario';
COMMENT ON COLUMN siges.usuario.usuario_creacion IS 'Campo que almacena el usuario que creo el usuario';
COMMENT ON COLUMN siges.usuario.usuario_modificacion IS 'Campo que almacena el usuario que modifico el usuario';
