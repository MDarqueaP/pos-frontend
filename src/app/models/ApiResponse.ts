export interface ErrorResponse {
  header: any;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
};

export interface Error {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
}

