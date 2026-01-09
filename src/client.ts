export class ApiClient {
  constructor(
    private baseUrl: string,
    private bggApiToken?: string,
  ) {
    this.baseUrl = baseUrl;
    this.bggApiToken = bggApiToken;
  }
}
