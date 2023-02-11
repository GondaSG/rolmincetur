function getDomain() {
    return {
        "domain": [{
            "id": 5,
            "name": "Tramo Media Tensión",
            "properties": [
                "CODEMP",
                "CODTIPORED"
            ]
        }, {
            "id": 6,
            "name": "Estructuras MT",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 8,
            "name": "SED - Esc. hasta 1/30000",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 9,
            "name": "SED - Esc. hasta 1/9000",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 10,
            "name": "Estructuras BT",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 11,
            "name": "Tramo Baja Tensión",
            "properties": [
                "CODEMP",
                "CODTIPORED"
            ]
        }, {
            "id": 12,
            "name": "Acometidas",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 13,
            "name": "Suministros",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 14,
            "name": "Tramo Alumbrado Público",
            "properties": [
                "CODEMP",
                "CODTIPORED",
                "CODSOPORTE"
            ]
        }, {
            "id": 15,
            "name": "Alumbrado Público",
            "properties": [
                "CODEMP"
            ]
        }, {
            "id": 16,
            "name": "Área de Concesión",
            "properties": [
                "CODEMP"
            ]
        }],
        "propertie": [{
                "id": "CODEMP",
                "values": [{
                    "ADIL": "Adinelsa",
                    "CHAV": "Chavimochic",
                    "COEL": "Coelvisac",
                    "EDLN": "Enel",
                    "EDSA": "Edelsa",
                    "EGEP": "Egepsa",
                    "EIHC": "Eilhicha",
                    "ELC": "Electrocentro",
                    "ELDU": "Electro Dunas",
                    "ELIN": "Entelin",
                    "ELN": "Electronorte",
                    "ELNM": "Hidrandina",
                    "ELNO": "Electronoroeste",
                    "ELOR": "Electro Oriente",
                    "ELPU": "Electro Puno",
                    "ELS": "Electrosur",
                    "ELSE": "Electro Sur Este",
                    "ELTO": "Electro Tocache",
                    "ELUC": "Electro Ucayali",
                    "EMSE": "Emsemsa",
                    "EMSU": "Emseusa",
                    "EPAN": "Electro Pangoa",
                    "ERGO": "Ergon Perú",
                    "ESEM": "Esempat",
                    "LDS": "Luz del Sur",
                    "PME": "Perú Microenergía",
                    "SEAL": "Seal",
                    "SERS": "Sersa"
                }]
            },
            {
                "id": "CODSOPORTE",
                "values": [{
                    "A": "MADERA",
                    "B": "HORMIGÓN",
                    "C": "CONCRETO",
                    "D": "FIERRO",
                    "E": "SIN ESTRUCTURA O RED COMPARTIDA",
                    "F": "FIBRA DE VIDRIO",
                    "X": "NINGUNO (*)"
                }],
            },
            {
                "id": "CODTIPORED",
                "values": [{
                    "A": "AÉREO",
                    "S": "SUBTERRÁNEO"
                }]
            }
        ]
    };
}