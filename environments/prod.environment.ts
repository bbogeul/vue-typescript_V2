import packageInfo from '../package.json';
import { Environment } from './environment.type';

export const ProductionEnvironment: Environment = {
  baseURL: 'http://localhost:4200/',
  NODE_ENV: 'development',
  production: false,
  clientName: packageInfo.name,
};
