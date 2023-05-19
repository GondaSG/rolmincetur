package pe.gob.vuce.template.authorize.domain.service;

public class ValidationException extends Exception{
    private final int code;
    public ValidationException (int code, String msg) {
        super(msg);
        this.code = code;
    }
}
