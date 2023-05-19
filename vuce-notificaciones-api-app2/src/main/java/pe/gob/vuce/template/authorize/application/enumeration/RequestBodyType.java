package pe.gob.vuce.template.authorize.application.enumeration;

public enum RequestBodyType {
	VALID {
        public String toString() {
            return "VALID";
        }
    },
	INVALID {
        public String toString() {
            return "INVALID";
        }
    },
}
