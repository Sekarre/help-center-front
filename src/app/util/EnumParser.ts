export class EnumParser {

  public static getEnumFromString<T>(type: T, str: string): T[keyof T] {
    return (<any>type)[str];
  }
}
