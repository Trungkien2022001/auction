export function parseStringToNumber(
  str: string | undefined,
  defaultValue: number
) {
  if (!str) {
    return defaultValue;
  }

  return parseInt(str);
}
