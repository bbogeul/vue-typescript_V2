import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const ProductionEnvironment: Environment = {
  baseURL: 'http://localhost:4200/',
  NODE_ENV: EnvironmentType.production,
  production: false,
  clientName: packageInfo.name,
};
