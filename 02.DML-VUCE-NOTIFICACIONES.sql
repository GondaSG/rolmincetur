
-- SCRIPT INSERT DE TABLAS

-- CATEGORIA ALIMENTO
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


-- ESTADO


-- CIUDAD
INSERT INTO siges.ciudad(nombre,descripcion)VALUES ('Lima', 'ciudad01');
INSERT INTO siges.ciudad(nombre,descripcion)VALUES ('Arequipa', 'ciudad02');


-- ENTIDAD

INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('COMPIAL', 'Comisión Multisectorial Permanente de Inocuidad Alimentaria');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('DIGESA', 'Dirección General de Salud Ambiental e Inocuidad Alimentaria del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('SENASA', 'Servicio Nacional de Sanidad Agraria del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('SANIPES', 'Organismo Nacional de Sanidad Pesquera del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('MINCETUR', 'Ministerio de Comercio Exterior y Turismo del Perú');
INSERT INTO siges.entidad(abreviatura, nombre)VALUES ('RREE', 'Ministerio de Relaciones Exteriores');
	
	
--  FUENTE NOTIFICACION
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
INSERT INTO siges.lugar_evento(nombre)VALUES ('Nacional');
INSERT INTO siges.lugar_evento(nombre)VALUES ('Extranjero');


-- ORIGEN NOTIFICACION
INSERT INTO siges.origen_notificacion(nombre)VALUES ('Nacional');
INSERT INTO siges.origen_notificacion(nombre)VALUES ('Internacional');


-- PAIS
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('AFGHANISTAN','AF','AFG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ALAND ISLANDS','AX','ALA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ALBANIA','AL','ALB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ALGERIA','DZ','DZA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ANDORRA','AD','AND');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ANGOLA','AO','AGO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ANGUILLA','AI','AIA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ANTARCTICA','AQ',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ANTIGUA AND BARBUDA','AG','ATG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ARGENTINA','AR','ARG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ARMENIA','AM','ARM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ARUBA','AW','ABW');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('AUSTRALIA','AU','AUS');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('AUSTRIA','AT','AUT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('AZERBAIJAN','AZ','AZE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BAHAMAS','BS','BHS');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BAHRAIN','BH','BHR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BANGLADESH','BD','BGD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BARBADOS','BB','BRB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BELARUS','BY','BLR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BELGIUM','BE','BEL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BELIZE','BZ','BLZ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BENIN','BJ','BEN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BERMUDA','BM','BMU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BHUTAN','BT','BTN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BOLIVIA','BO','BOL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BOSNIA AND HERZEGOVINA','BA','BIH');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BOTSWANA','BW','BWA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BOUVET ISLAND','BV',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BRAZIL','BR','BRA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BRITISH INDIAN OCEAN TERRITORY','IO',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BRUNEI DARUSSALAM','BN','BRN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BULGARIA','BG','BGR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BURKINA FASO','BF','BFA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BURUNDI','BI','BDI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CAMBODIA','KH','KHM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CAMEROON','CM','CMR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CANADA','CA','CAN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CAPE VERDE','CV','CPV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CAYMAN ISLANDS','KY','CYM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CENTRAL AFRICAN REPUBLIC','CF','CAF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CHAD','TD','TCD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CHILE','CL','CHL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CHINA','CN','CHN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CHRISTMAS ISLAND','CX',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COCOS (KEELING) ISLANDS','CC',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COLOMBIA','CO','COL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COMOROS','KM','COM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CONGO','CG','COG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CONGO, THE DEMOCRATIC REPUBLIC OF THE','CD','COD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COOK ISLANDS','CK','COK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COSTA RICA','CR','CRI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('COTE D''IVOIRE','CI','CIV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CROATIA','HR','HRV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CUBA','CU','CUB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CYPRUS','CY','CYP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CZECH REPUBLIC','CZ','CZE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('DENMARK','DK','DNK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('DJIBOUTI','DJ','DJI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('DOMINICA','DM','DMA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('DOMINICAN REPUBLIC','DO','DOM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ECUADOR','EC','ECU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('EGYPT','EG','EGY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('EL SALVADOR','SV','SLV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('EQUATORIAL GUINEA','GQ','GNQ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ERITREA','ER','ERI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ESTONIA','EE','EST');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ETHIOPIA','ET','ETH');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FALKLAND ISLANDS (MALVINAS)','FK','FLK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FAROE ISLANDS','FO','FRO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FIJI','FJ','FJI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FINLAND','FI','FIN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FRANCE','FR','FRA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FRENCH GUIANA','GF','GUF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FRENCH POLYNESIA','PF','PYF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('FRENCH SOUTHERN TERRITORIES','TF',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GABON','GA','GAB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GAMBIA','GM','GMB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GEORGIA','GE','GEO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GERMANY','DE','DEU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GHANA','GH','GHA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GIBRALTAR','GI','GIB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GREECE','GR','GRC');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GREENLAND','GL','GRL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GRENADA','GD','GRD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUADELOUPE','GP','GLP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUAM','GU','GUM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUATEMALA','GT','GTM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUINEA','GN','GIN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUINEA-BISSAU','GW','GNB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUYANA','GY','GUY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HAITI','HT','HTI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HEARD ISLAND AND MCDONALD ISLANDS','HM',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HOLY SEE (VATICAN CITY STATE)','VA','VAT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HONDURAS','HN','HND');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HONG KONG','HK','HKG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('HUNGARY','HU','HUN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ICELAND','IS','ISL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('INDIA','IN','IND');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('INDONESIA','ID','IDN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('IRAN, ISLAMIC REPUBLIC OF','IR','IRN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('IRAQ','IQ','IRQ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('IRELAND','IE','IRL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ISRAEL','IL','ISR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ITALY','IT','ITA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('JAMAICA','JM','JAM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('JAPAN','JP','JPN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('JORDAN','JO','JOR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KAZAKHSTAN','KZ','KAZ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KENYA','KE','KEN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KIRIBATI','KI','KIR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF','KP','PRK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('REPUBLIC OF KOREA','KR','KOR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KUWAIT','KW','KWT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('KYRGYZSTAN','KG','KGZ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LAO PEOPLE''S DEMOCRATIC REPUBLIC','LA','LAO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LATVIA','LV','LVA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LEBANON','LB','LBN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LESOTHO','LS','LSO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LIBERIA','LR','LBR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LIBYAN ARAB JAMAHIRIYA','LY','LBY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LIECHTENSTEIN','LI','LIE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LITHUANIA','LT','LTU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('LUXEMBOURG','LU','LUX');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MACAO','MO','MAC');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF','MK','MKD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MADAGASCAR','MG','MDG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MALAWI','MW','MWI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MALAYSIA','MY','MYS');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MALDIVES','MV','MDV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MALI','ML','MLI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MALTA','MT','MLT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MARSHALL ISLANDS','MH','MHL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MARTINIQUE','MQ','MTQ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MAURITANIA','MR','MRT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MAURITIUS','MU','MUS');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MAYOTTE','YT',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MEXICO','MX','MEX');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MICRONESIA, FEDERATED STATES OF','FM','FSM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MOLDOVA, REPUBLIC OF','MD','MDA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MONACO','MC','MCO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MONGOLIA','MN','MNG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MONTSERRAT','MS','MSR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MOROCCO','MA','MAR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MOZAMBIQUE','MZ','MOZ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MYANMAR','MM','MMR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NAMIBIA','NA','NAM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NAURU','NR','NRU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NEPAL','NP','NPL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NETHERLANDS','NL','NLD');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NETHERLANDS ANTILLES','AN','ANT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NEW CALEDONIA','NC','NCL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NEW ZEALAND','NZ','NZL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NICARAGUA','NI','NIC');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NIGER','NE','NER');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NIGERIA','NG','NGA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NIUE','NU','NIU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NORFOLK ISLAND','NF','NFK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NORTHERN MARIANA ISLANDS','MP','MNP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('NORWAY','NO','NOR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('OMAN','OM','OMN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PAKISTAN','PK','PAK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PALAU','PW','PLW');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PALESTINIAN TERRITORY, OCCUPIED','PS',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PANAMA','PA','PAN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PAPUA NEW GUINEA','PG','PNG');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PARAGUAY','PY','PRY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PERÚ','PE','PER');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PHILIPPINES','PH','PHL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PITCAIRN','PN','PCN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('POLAND','PL','POL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PORTUGAL','PT','PRT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('PUERTO RICO','PR','PRI');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('QATAR','QA','QAT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('REUNION','RE','REU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ROMANIA','RO','ROM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('RUSSIAN FEDERATION','RU','RUS');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('RWANDA','RW','RWA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT HELENA','SH','SHN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT KITTS AND NEVIS','KN','KNA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT LUCIA','LC','LCA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT PIERRE AND MIQUELON','PM','SPM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT VINCENT AND THE GRENADINES','VC','VCT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAMOA','WS','WSM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAN MARINO','SM','SMR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAO TOME AND PRINCIPE','ST','STP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAUDI ARABIA','SA','SAU');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SENEGAL','SN','SEN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SERBIA AND MONTENEGRO','CS',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SEYCHELLES','SC','SYC');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SIERRA LEONE','SL','SLE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SINGAPORE','SG','SGP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SLOVAKIA','SK','SVK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SLOVENIA','SI','SVN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SOLOMON ISLANDS','SB','SLB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SOMALIA','SO','SOM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SOUTH AFRICA','ZA','ZAF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS','GS',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SPAIN','ES','ESP');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SRI LANKA','LK','LKA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SUDAN','SD','SDN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SURINAME','SR','SUR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SVALBARD AND JAN MAYEN','SJ','SJM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SWAZILAND','SZ','SWZ');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SWEDEN','SE','SWE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SWITZERLAND','CH','CHE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SYRIAN ARAB REPUBLIC','SY','SYR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TAIWAN, PROVINCE OF CHINA','TW','TWN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TAJIKISTAN','TJ','TJK');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TANZANIA, UNITED REPUBLIC OF','TZ','TZA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('THAILAND','TH','THA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TIMOR-LESTE','TL',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TOGO','TG','TGO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TOKELAU','TK','TKL');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TONGA','TO','TON');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TRINIDAD AND TOBAGO','TT','TTO');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TUNISIA','TN','TUN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TURKEY','TR','TUR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TURKMENISTAN','TM','TKM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TURKS AND CAICOS ISLANDS','TC','TCA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('TUVALU','TV','TUV');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UGANDA','UG','UGA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UKRAINE','UA','UKR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UNITED ARAB EMIRATES','AE','ARE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UNITED KINGDOM','GB','GBR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UNITED STATES','US','USA');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UNITED STATES MINOR OUTLYING ISLANDS','UM',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('URUGUAY','UY','URY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('UZBEKISTAN','UZ','UZB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('VANUATU','VU','VUT');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('VENEZUELA','VE','VEN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('VIET NAM','VN','VNM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('VIRGIN ISLANDS, BRITISH','VG','VGB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('VIRGIN ISLANDS, U.S.','VI','VIR');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('WALLIS AND FUTUNA','WF','WLF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('WESTERN SAHARA','EH','ESH');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('YEMEN','YE','YEM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ZAMBIA','ZM','ZMB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ZIMBABWE','ZW','ZWE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('AMERICAN SAMOA','AS','ASM');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SERBIA','RS','SRB');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('ISLE OF MAN','IM','IMN');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('GUERNSEY','GG','GGY');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('MONTENEGRO','ME','MNE');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('INSTALLATIONS IN INTERNATIONAL WATERS','XZ',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('JERSEY_1_PRUEBA','JE',NULL);
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SAINT MARTIN (FRENCH PART)','MF','MAF');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('BONAIRE, SINT EUSTATIUS AND SABA','BQ','BES');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('CURACAO','CW','CUW');
insert into siges.pais (nombre,iso_alfa2,iso_alfa3) values('SINT MAARTEN (DUTCH PART)','SX','SXM');


-- ROL	

	
-- ROL ASIGNACION


-- TIPO ALIMENTO
INSERT INTO siges.tipo_alimento(nombre)VALUES ('Vitaminas');
INSERT INTO siges.tipo_alimento(nombre)VALUES ('Proteinas');


-- TIPO NOTIFICACION
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Alerta', 'Descripcion01');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Información', 'Descripcion02');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Rechazo', 'Descripcion03');


-- TIPO PRESENTACION
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Bolsa');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Tarro');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Lata');


-- UNIDAD MEDIDA
INSERT INTO siges.unidad_medida(nombre)VALUES ('Tonelada');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Kilos');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Litros');	




