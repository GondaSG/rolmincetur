package pe.gob.vuce.template.authorize.application.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import java.util.Objects;

@ApiModel(description = "Objeto usado para retornar mensaje de error 500")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2020-07-15T17:34:31.735Z[GMT]")
public class ErrorResponse   {
  @JsonProperty("type")
  private String type = null;

  @JsonProperty("alias")
  private String alias = null;

  @JsonProperty("description")
  private String description = null;

  public ErrorResponse(String type, String alias, String description) {
    this.type = type;
    this.alias = alias;
    this.description = description;
  }

  public ErrorResponse type(String type) {
    this.type = type;
    return this;
  }

  /**
   * Tipo de mensaje de error
   * @return type
  **/
  @ApiModelProperty(value = "Tipo de mensaje de error")
  
    public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public ErrorResponse alias(String alias) {
    this.alias = alias;
    return this;
  }

  /**
   * Descripcion corta del mensaje del error
   * @return alias
  **/
  @ApiModelProperty(value = "Descripcion corta del mensaje del error")
  
    public String getAlias() {
    return alias;
  }

  public void setAlias(String alias) {
    this.alias = alias;
  }

  public ErrorResponse description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Descripcion larga del mensaje del error
   * @return description
  **/
  @ApiModelProperty(value = "Descripcion larga del mensaje del error")
  
    public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ErrorResponse errorResponse = (ErrorResponse) o;
    return Objects.equals(this.type, errorResponse.type) &&
        Objects.equals(this.alias, errorResponse.alias) &&
        Objects.equals(this.description, errorResponse.description);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, alias, description);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ErrorResponse {\n");
    
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    alias: ").append(toIndentedString(alias)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
