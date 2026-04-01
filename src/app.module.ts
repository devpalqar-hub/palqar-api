import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactFormsModule } from './contact-forms/contact-forms.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContactFormsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
