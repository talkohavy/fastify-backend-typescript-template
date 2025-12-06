export interface StaticModule {
  getInstance: () => ModuleFactory;
}

export interface ModuleFactory {
  registerController(app: any): void;
  attachEventHandlers?(io: any): void;
}
