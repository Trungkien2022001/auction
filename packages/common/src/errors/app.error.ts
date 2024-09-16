export class AppError extends Error {
  constructor(public readonly code: string) {
    super();
  }
}
