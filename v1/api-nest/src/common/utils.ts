export function getVariableName<TResult>(
  getVar: () => TResult,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName: string = m[1];

  const memberParts: Array<string> = fullMemberName.split('.');

  return memberParts.at(-1);
}

export function toBoolean(
  value: number | string | Array<unknown> | undefined | null,
): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return false;
  }

  return !!value;
}
