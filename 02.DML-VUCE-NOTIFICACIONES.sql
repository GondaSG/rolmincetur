
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
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Control Oficial', '1');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Laboratorios Acreditados Externos', '1');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Otras Instituciones Locales', '1');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Ciudadanía', '1');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('ONG', '1');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('INFOSAN', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('RAFF', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('USDA', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('FDA', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Embajada', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Vigilancia', '2');
INSERT INTO siges.fuente_notificacion(nombre, tipo_id)VALUES ('Otro', '3');



-- ORIGEN NOTIFICACION
INSERT INTO siges.origen_notificacion(nombre)VALUES ('Nacional');
INSERT INTO siges.origen_notificacion(nombre)VALUES ('Internacional');


-- PAIS
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('AFGHANISTAN','AF','AFG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ALAND ISLANDS','AX','ALA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ALBANIA','AL','ALB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ALGERIA','DZ','DZA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ANDORRA','AD','AND');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ANGOLA','AO','AGO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ANGUILLA','AI','AIA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ANTARCTICA','AQ',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ANTIGUA AND BARBUDA','AG','ATG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ARGENTINA','AR','ARG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ARMENIA','AM','ARM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ARUBA','AW','ABW');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('AUSTRALIA','AU','AUS');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('AUSTRIA','AT','AUT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('AZERBAIJAN','AZ','AZE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BAHAMAS','BS','BHS');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BAHRAIN','BH','BHR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BANGLADESH','BD','BGD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BARBADOS','BB','BRB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BELARUS','BY','BLR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BELGIUM','BE','BEL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BELIZE','BZ','BLZ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BENIN','BJ','BEN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BERMUDA','BM','BMU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BHUTAN','BT','BTN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BOLIVIA','BO','BOL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BOSNIA AND HERZEGOVINA','BA','BIH');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BOTSWANA','BW','BWA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BOUVET ISLAND','BV',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BRAZIL','BR','BRA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BRITISH INDIAN OCEAN TERRITORY','IO',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BRUNEI DARUSSALAM','BN','BRN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BULGARIA','BG','BGR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BURKINA FASO','BF','BFA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BURUNDI','BI','BDI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CAMBODIA','KH','KHM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CAMEROON','CM','CMR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CANADA','CA','CAN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CAPE VERDE','CV','CPV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CAYMAN ISLANDS','KY','CYM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CENTRAL AFRICAN REPUBLIC','CF','CAF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CHAD','TD','TCD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CHILE','CL','CHL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CHINA','CN','CHN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CHRISTMAS ISLAND','CX',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COCOS (KEELING) ISLANDS','CC',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COLOMBIA','CO','COL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COMOROS','KM','COM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CONGO','CG','COG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CONGO, THE DEMOCRATIC REPUBLIC OF THE','CD','COD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COOK ISLANDS','CK','COK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COSTA RICA','CR','CRI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('COTE D''IVOIRE','CI','CIV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CROATIA','HR','HRV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CUBA','CU','CUB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CYPRUS','CY','CYP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CZECH REPUBLIC','CZ','CZE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('DENMARK','DK','DNK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('DJIBOUTI','DJ','DJI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('DOMINICA','DM','DMA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('DOMINICAN REPUBLIC','DO','DOM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ECUADOR','EC','ECU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('EGYPT','EG','EGY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('EL SALVADOR','SV','SLV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('EQUATORIAL GUINEA','GQ','GNQ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ERITREA','ER','ERI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ESTONIA','EE','EST');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ETHIOPIA','ET','ETH');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FALKLAND ISLANDS (MALVINAS)','FK','FLK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FAROE ISLANDS','FO','FRO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FIJI','FJ','FJI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FINLAND','FI','FIN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FRANCE','FR','FRA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FRENCH GUIANA','GF','GUF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FRENCH POLYNESIA','PF','PYF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('FRENCH SOUTHERN TERRITORIES','TF',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GABON','GA','GAB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GAMBIA','GM','GMB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GEORGIA','GE','GEO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GERMANY','DE','DEU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GHANA','GH','GHA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GIBRALTAR','GI','GIB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GREECE','GR','GRC');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GREENLAND','GL','GRL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GRENADA','GD','GRD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUADELOUPE','GP','GLP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUAM','GU','GUM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUATEMALA','GT','GTM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUINEA','GN','GIN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUINEA-BISSAU','GW','GNB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUYANA','GY','GUY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HAITI','HT','HTI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HEARD ISLAND AND MCDONALD ISLANDS','HM',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HOLY SEE (VATICAN CITY STATE)','VA','VAT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HONDURAS','HN','HND');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HONG KONG','HK','HKG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('HUNGARY','HU','HUN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ICELAND','IS','ISL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('INDIA','IN','IND');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('INDONESIA','ID','IDN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('IRAN, ISLAMIC REPUBLIC OF','IR','IRN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('IRAQ','IQ','IRQ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('IRELAND','IE','IRL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ISRAEL','IL','ISR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ITALY','IT','ITA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('JAMAICA','JM','JAM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('JAPAN','JP','JPN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('JORDAN','JO','JOR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KAZAKHSTAN','KZ','KAZ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KENYA','KE','KEN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KIRIBATI','KI','KIR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF','KP','PRK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('REPUBLIC OF KOREA','KR','KOR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KUWAIT','KW','KWT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('KYRGYZSTAN','KG','KGZ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LAO PEOPLE''S DEMOCRATIC REPUBLIC','LA','LAO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LATVIA','LV','LVA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LEBANON','LB','LBN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LESOTHO','LS','LSO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LIBERIA','LR','LBR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LIBYAN ARAB JAMAHIRIYA','LY','LBY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LIECHTENSTEIN','LI','LIE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LITHUANIA','LT','LTU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('LUXEMBOURG','LU','LUX');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MACAO','MO','MAC');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF','MK','MKD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MADAGASCAR','MG','MDG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MALAWI','MW','MWI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MALAYSIA','MY','MYS');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MALDIVES','MV','MDV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MALI','ML','MLI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MALTA','MT','MLT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MARSHALL ISLANDS','MH','MHL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MARTINIQUE','MQ','MTQ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MAURITANIA','MR','MRT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MAURITIUS','MU','MUS');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MAYOTTE','YT',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MEXICO','MX','MEX');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MICRONESIA, FEDERATED STATES OF','FM','FSM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MOLDOVA, REPUBLIC OF','MD','MDA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MONACO','MC','MCO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MONGOLIA','MN','MNG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MONTSERRAT','MS','MSR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MOROCCO','MA','MAR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MOZAMBIQUE','MZ','MOZ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MYANMAR','MM','MMR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NAMIBIA','NA','NAM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NAURU','NR','NRU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NEPAL','NP','NPL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NETHERLANDS','NL','NLD');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NETHERLANDS ANTILLES','AN','ANT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NEW CALEDONIA','NC','NCL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NEW ZEALAND','NZ','NZL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NICARAGUA','NI','NIC');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NIGER','NE','NER');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NIGERIA','NG','NGA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NIUE','NU','NIU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NORFOLK ISLAND','NF','NFK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NORTHERN MARIANA ISLANDS','MP','MNP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('NORWAY','NO','NOR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('OMAN','OM','OMN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PAKISTAN','PK','PAK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PALAU','PW','PLW');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PALESTINIAN TERRITORY, OCCUPIED','PS',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PANAMA','PA','PAN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PAPUA NEW GUINEA','PG','PNG');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PARAGUAY','PY','PRY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PERÚ','PE','PER');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PHILIPPINES','PH','PHL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PITCAIRN','PN','PCN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('POLAND','PL','POL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PORTUGAL','PT','PRT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('PUERTO RICO','PR','PRI');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('QATAR','QA','QAT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('REUNION','RE','REU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ROMANIA','RO','ROM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('RUSSIAN FEDERATION','RU','RUS');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('RWANDA','RW','RWA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT HELENA','SH','SHN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT KITTS AND NEVIS','KN','KNA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT LUCIA','LC','LCA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT PIERRE AND MIQUELON','PM','SPM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT VINCENT AND THE GRENADINES','VC','VCT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAMOA','WS','WSM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAN MARINO','SM','SMR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAO TOME AND PRINCIPE','ST','STP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAUDI ARABIA','SA','SAU');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SENEGAL','SN','SEN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SERBIA AND MONTENEGRO','CS',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SEYCHELLES','SC','SYC');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SIERRA LEONE','SL','SLE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SINGAPORE','SG','SGP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SLOVAKIA','SK','SVK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SLOVENIA','SI','SVN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SOLOMON ISLANDS','SB','SLB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SOMALIA','SO','SOM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SOUTH AFRICA','ZA','ZAF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS','GS',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SPAIN','ES','ESP');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SRI LANKA','LK','LKA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SUDAN','SD','SDN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SURINAME','SR','SUR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SVALBARD AND JAN MAYEN','SJ','SJM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SWAZILAND','SZ','SWZ');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SWEDEN','SE','SWE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SWITZERLAND','CH','CHE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SYRIAN ARAB REPUBLIC','SY','SYR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TAIWAN, PROVINCE OF CHINA','TW','TWN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TAJIKISTAN','TJ','TJK');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TANZANIA, UNITED REPUBLIC OF','TZ','TZA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('THAILAND','TH','THA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TIMOR-LESTE','TL',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TOGO','TG','TGO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TOKELAU','TK','TKL');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TONGA','TO','TON');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TRINIDAD AND TOBAGO','TT','TTO');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TUNISIA','TN','TUN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TURKEY','TR','TUR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TURKMENISTAN','TM','TKM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TURKS AND CAICOS ISLANDS','TC','TCA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('TUVALU','TV','TUV');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UGANDA','UG','UGA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UKRAINE','UA','UKR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UNITED ARAB EMIRATES','AE','ARE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UNITED KINGDOM','GB','GBR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UNITED STATES','US','USA');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UNITED STATES MINOR OUTLYING ISLANDS','UM',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('URUGUAY','UY','URY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('UZBEKISTAN','UZ','UZB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('VANUATU','VU','VUT');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('VENEZUELA','VE','VEN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('VIET NAM','VN','VNM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('VIRGIN ISLANDS, BRITISH','VG','VGB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('VIRGIN ISLANDS, U.S.','VI','VIR');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('WALLIS AND FUTUNA','WF','WLF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('WESTERN SAHARA','EH','ESH');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('YEMEN','YE','YEM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ZAMBIA','ZM','ZMB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ZIMBABWE','ZW','ZWE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('AMERICAN SAMOA','AS','ASM');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SERBIA','RS','SRB');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('ISLE OF MAN','IM','IMN');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('GUERNSEY','GG','GGY');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('MONTENEGRO','ME','MNE');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('INSTALLATIONS IN INTERNATIONAL WATERS','XZ',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('JERSEY_1_PRUEBA','JE',NULL);
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SAINT MARTIN (FRENCH PART)','MF','MAF');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('BONAIRE, SINT EUSTATIUS AND SABA','BQ','BES');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('CURACAO','CW','CUW');
INSERT INTO siges.pais (nombre,iso_alfa2,iso_alfa3) VALUES('SINT MAARTEN (DUTCH PART)','SX','SXM');


-- ROL	

	
-- ROL ASIGNACION


-- TIPO ALIMENTO
INSERT INTO siges.tipo_alimento(nombre)VALUES ('Vitaminas');
INSERT INTO siges.tipo_alimento(nombre)VALUES ('Proteinas');


-- TIPO NOTIFICACION
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Alerta', '');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Información', '');
INSERT INTO siges.tipo_notificacion(nombre,descripcion)VALUES ('Rechazo', '');


-- TIPO PRESENTACION
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Bolsa');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Tarro');
INSERT INTO siges.tipo_presentacion(nombre)VALUES ('Lata');


-- UNIDAD MEDIDA
INSERT INTO siges.unidad_medida(nombre)VALUES ('Tonelada');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Kilos');
INSERT INTO siges.unidad_medida(nombre)VALUES ('Litros');	

-- TIPO USUARIO
INSERT INTO siges.tipo_usuario(nombre)VALUES ('PCR');
INSERT INTO siges.tipo_usuario(nombre)VALUES ('PCO');

-- FASE
INSERT INTO siges.fase(nombre) VALUES ('Fase 1');
INSERT INTO siges.fase(nombre) VALUES ('Fase 2');
INSERT INTO siges.fase(nombre) VALUES ('Fase 3');
INSERT INTO siges.fase(nombre) VALUES ('Fase 4');
INSERT INTO siges.fase(nombre) VALUES ('Fase 5');




