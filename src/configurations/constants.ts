export const ConfigKeys = {
  Port: 'port',
  IsDev: 'isDev',
  IsCI: 'isCI',
  AuthCookie: 'authCookie',
  Cookies: 'cookies',
  Jwt: 'jwt',
  Services: 'services',
} as const;

type TypeOfConfigKeys = typeof ConfigKeys;
export type ConfigKeyValues = TypeOfConfigKeys[keyof TypeOfConfigKeys];

export type Config = {
  [ConfigKeys.Port]: number;
  [ConfigKeys.IsDev]: boolean;
  [ConfigKeys.IsCI]: boolean;
  [ConfigKeys.AuthCookie]: AuthCookieConfig;
  [ConfigKeys.Cookies]: CookiesConfig;
  [ConfigKeys.Jwt]: JwtConfig;
};

export type AuthCookieConfig = {
  /**
   * In milliseconds
   */
  maxAge: number;
};

type SingleCookie = {
  name: string;
  domain: string;
  maxAge: number;
};

export type CookiesConfig = {
  accessCookie: SingleCookie;
  refreshCookie: SingleCookie;
};

export type JwtConfig = {
  accessSecret: string;
  refreshSecret: string;
  accessExpireTime: string;
  refreshExpireTime: string;
  issuer: string;
};

export const ServiceNames = {
  Auth: 'auth',
  Users: 'users',
  Books: 'books',
  Dragons: 'dragons',
  FileUpload: 'file-upload',
} as const;

export type ServiceNameKeys = keyof typeof ServiceNames;
export type ServiceNameValues = (typeof ServiceNames)[ServiceNameKeys];

export type ServicesConfig = Record<ServiceNameValues, { baseUrl: string }>;
