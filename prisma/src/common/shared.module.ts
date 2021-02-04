import { DynamicModule, Module } from '@nestjs/common';
import { PasswordCipher } from './utils/password-ciper';

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: CommonModule,
      providers: [PasswordCipher],
      exports: [PasswordCipher],
    };
  }
}
