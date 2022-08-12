export class GenericHelper {
  public static isNullOrEmpty(value: any): boolean {
    return value === undefined || value === null || value.toString().trim() === '';
  }

  public static isNullOrArrayEmpty(value: any): boolean {
    return value === undefined || value === null || value.length === 0;
  }

  public static isValidDni(value: string){
    return value.match(/^\d{8}$/);
  }
  
  public static isValidDateFormat(value: string){
    return value.match(/^\d{2}\/\d{2}\/\d{4}$/);
  }

  public static isValidEmail(value: string){
    return value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }
}
