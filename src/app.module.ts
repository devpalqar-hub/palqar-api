import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactFormsModule } from './contact-forms/contact-forms.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContactFormsModule, S3Module],
  controllers: [],
  providers: [],
})
export class AppModule { }
