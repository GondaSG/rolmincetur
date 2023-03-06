package pe.gob.vuce.template.authorize.util;

import lombok.extern.slf4j.Slf4j;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class Util {

    public static String getStrFromDate(Date date, String format) {
        format = format == null ? Constantes.DATEFORMAT : format;
        DateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    public static Date getDateFromStr(String dateStr, String format) {
        format = format == null ? Constantes.DATEFORMAT : format;
        Date dateFormat = null;
        try {
            dateFormat = new SimpleDateFormat(format).parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return dateFormat;
    }
}
