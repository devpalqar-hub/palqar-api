import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { GetContactFormsDto } from './dto/get-contact-forms.dto';
import nodemailer from 'nodemailer';

@Injectable()
export class ContactFormsService {
    private readonly logger = new Logger(ContactFormsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) { }

    async create(createContactFormDto: CreateContactFormDto) {
        const created = await this.prisma.contactForm.create({
            data: createContactFormDto,
        });

        try {
            await this.sendNotificationEmail(created);
        } catch (error) {
            this.logger.error('Failed to send contact form email', error as Error);
            throw new InternalServerErrorException(
                'Contact form saved but email sending failed.',
            );
        }

        return created;
    }

    async findAll(query: GetContactFormsDto) {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const skip = (page - 1) * limit;
        const where: any = {};
        if (query.formType) {
            where.formType = query.formType;
        }
        const [data, total] = await Promise.all([
            this.prisma.contactForm.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.contactForm.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const entry = await this.prisma.contactForm.findUnique({ where: { id } });
        if (!entry) {
            throw new NotFoundException('Contact form not found');
        }
        return entry;
    }

    private async sendNotificationEmail(payload: Record<string, unknown>) {
        const host = this.configService.get<string>('MAIL_HOST');
        const port = Number(this.configService.get<string>('MAIL_PORT') || 587);
        const secure = this.configService.get<string>('MAIL_SECURE') === 'true';
        const user = this.configService.get<string>('MAIL_USER');
        const pass = this.configService.get<string>('MAIL_PASS');
        const from = this.configService.get<string>('MAIL_FROM') || user;
        const to =
            this.configService.get<string>('MAIL_TO') ||
            this.configService.get<string>('MAIL_USER');

        if (!host || !user || !pass || !from || !to) {
            this.logger.warn(
                'MAIL configuration missing. Contact form email was skipped.',
            );
            return;
        }

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });

        const html = `
      <h2>New Contact Form Submission</h2>
      <ul>
        ${Object.entries(payload)
                .map(
                    ([key, value]) =>
                        `<li><strong>${key}</strong>: ${value ?? ''}</li>`,
                )
                .join('')}
      </ul>
    `;

        await transporter.sendMail({
            from,
            to,
            subject: 'New Contact Form Submission',
            html,
        });
    }
}
