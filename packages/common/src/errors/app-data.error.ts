export class AppDataError extends Error {
  constructor(public readonly code: string, public readonly data: any) {
    super();
  }
}
