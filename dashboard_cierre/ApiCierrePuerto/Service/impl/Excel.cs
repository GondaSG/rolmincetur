using ApiCierrePuerto.Config;
using ApiCierrePuerto.domain;
using ExcelDataReader;
//using ExcelDataReader.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net.Sockets;
using System.Text;

namespace ApiCierrePuerto.Service.impl
{
    public class Excel : IExcel
    {

        AppSettings settings;
        public Excel(AppSettings _settings) { 
            settings = _settings;
        }

        public Puerto leer()
        {
            Puerto puerto = new Puerto();
            Data data;
            Data2 data2;
            string fileName = settings.ruta;
            FileInfo archivo = new FileInfo(fileName);
            try
            {
                using (StreamReader jsonStream = File.OpenText(settings.rutaJson))
                {
                    var json = jsonStream.ReadToEnd();
                    puerto = JsonConvert.DeserializeObject<Puerto>(json);
                }
                if (puerto.lastModificationDate == (archivo.LastWriteTime == null ? "" : archivo.LastWriteTime.ToString())) return puerto;
                File.Delete(settings.rutaJson);
            }
            catch (Exception ex)
            {
            }



            try
            {
                using (var stream = File.Open(fileName, FileMode.Open, FileAccess.Read,FileShare.Read))
                {

                    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                        {
                            ConfigureDataTable = (data) => new ExcelDataTableConfiguration()
                            {
                                UseHeaderRow = true
                            }
                        });

                        DataTableCollection table = result.Tables;
                        //primera tabla
                        DataTable resultTable = table["Data"];
                        int countData = resultTable.Rows.Count;
                        puerto.data = new List<Data>();

                        Nullable<DateTime> nulldatetime;
                        nulldatetime = DateTime.Now;
                        nulldatetime = null;
                        for (int i = 0; i < countData; i++)
                        {
                            if (i < 2) continue;
                            DataRow row = resultTable.Rows[i];
                            data = new Data();
                            data.puerto = row[0].ToString();
                            data.zona = row[1].ToString();
                            data.instalaciónPortuaria = row[2].ToString();
                            data.fechaHoraCierre = (DateTime)row[3];
                            data.fechaHoraApertura = row[4].ToString() == "" ? nulldatetime : (DateTime)row[4];
                            data.tiempoPuertoCerrado = row[5].ToString();
                            data.motivo = row[6].ToString();
                            data.instalaciónPortuariaEstándar = row[7].ToString();
                            data.díasDeCierre = row[8].ToString();
                            data.ano = row[9].ToString();
                            data.estado = data.fechaHoraApertura == null ? "CERRADO" : "ABIERTO";
                            data.mes = row[10].ToString();
                            data.comentarios = row[11].ToString();
                            puerto.data.Add(data);
                        }
                        puerto.countData = puerto.data.Count;
                        //segunda tabla
                        DataTable resultTable2 = table["Data2"];
                        int countData2 = resultTable2.Rows.Count;
                        puerto.data2 = new List<Data2>();
                        for (int i = 0; i < countData2; i++)
                        {
                            if (i < 3) continue;
                            DataRow row = resultTable2.Rows[i];
                            data2 = new Data2();
                            data2.fecha = (DateTime)row[0];
                            data2.sdate = data2.getShortDate();
                            data2.ano = ((DateTime)row[0]).Year.ToString();
                            data2.terminal = row[1].ToString();
                            data2.producto = row[2].ToString();
                            data2.diasDespacho = row[3].ToString();
                            data2.puerto = row[1].ToString().Replace("CALLAO", "CALLAO (MUELLE 7)");
                            puerto.data2.Add(data2);
                        }
                        puerto.countData2 = puerto.data2.Count;
                        puerto.mensaje = "se termino la lectura.";
                        puerto.lastModificationDate = archivo.LastWriteTime.ToString();
                        StringBuilder json = new StringBuilder();
                        json.Append(JsonConvert.SerializeObject(puerto));
                        System.IO.File.WriteAllText(settings.rutaJson, json.ToString());
                        return puerto;
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
