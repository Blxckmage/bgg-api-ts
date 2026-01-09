import { parseXml } from "./helper/parser";
import { BggError } from "./types/error.types";

export class BggClient {
  private readonly parser = parseXml;
  private readonly RATE_LIMIT_MS = 5000;
  private lastRequestTime = 0;

  private async ensureRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.RATE_LIMIT_MS) {
      const waitTime = this.RATE_LIMIT_MS - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime = Date.now();
  }

  constructor(
    protected readonly baseUrl: string,
    protected readonly bggApiToken?: string,
  ) {
    this.baseUrl = baseUrl;
    this.bggApiToken = bggApiToken;
  }

  async request<T>(
    endpoint: string,
    params?: Record<string, string>,
  ): Promise<T> {
    await this.ensureRateLimit();

    const url = new URL(endpoint, this.baseUrl);
    const headers: Record<string, string> = {
      Accept: "application/xml",
      "User-Agent": "bgg-api-ts/1.0.0",
    };

    if (this.bggApiToken) {
      headers["Authorization"] = `Bearer ${this.bggApiToken}`;
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), { headers });

    if (response.status === 202) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return this.request<T>(endpoint, params);
    }

    if (response.status === 401 || response.status === 403) {
      throw new BggError("Authentication error: Invalid or missing API token.");
    }

    if (response.status === 429) {
      throw new BggError("Rate limit exceeded: Too many requests.");
    }

    if (response.status === 500 || response.status === 503) {
      throw new BggError("Server error: The server is currently unavailable.");
    }

    if (!response.ok) {
      throw new BggError(`HTTP error: ${response.statusText}`);
    }

    const xmlData = await response.text();
    const parsedData = this.parser(xmlData);

    return parsedData as T;
  }
}
