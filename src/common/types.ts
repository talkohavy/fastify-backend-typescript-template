import type { AuthenticationModule } from '../modules/authentication';
import type { HealthCheckModule } from '../modules/health-check';
import type { UsersModule } from '../modules/users';

export interface OptimizedApp {
  modules: {
    HealthCheckModule: HealthCheckModule;
    UsersModule: UsersModule;
    AuthenticationModule: AuthenticationModule;
    // BooksModule: BooksModule;
    // FileUploadModule: FileUploadModule;
  };
}
