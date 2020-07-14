export class Environment {
  baseURL?: string;
  NODE_ENV?: 'development' | 'staging' | 'production';
  production?: boolean;
  clientName?: string;
  productionTip?: boolean;
}
