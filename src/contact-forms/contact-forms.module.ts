import { Module } from '@nestjs/common';
import { ContactFormsController } from './contact-forms.controller';
import { ContactFormsService } from './contact-forms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ContactFormsController],
    providers: [ContactFormsService],
})
export class ContactFormsModule { }
