export class AppMetadataError extends Error {
  constructor(public readonly code: string, public readonly metadata: any) {
    super();
  }
}
