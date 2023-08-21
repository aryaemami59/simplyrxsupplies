export type EmptyString = "";

export const isEmptyString = <S extends string>(
  str: S
): str is EmptyString & S => typeof str === "string" && str === "";
