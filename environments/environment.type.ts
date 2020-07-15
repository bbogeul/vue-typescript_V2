export class Environment {
  baseURL?: string;
  NODE_ENV?: EnvironmentType;
  production?: boolean;
  clientName?: string;
  productionTip?: boolean;
}

export enum EnvironmentType {
  'development' = 'development',
  'staging' = 'staging',
  'production' = 'production',
}
