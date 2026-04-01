"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ContactFormsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFormsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const nodemailer_1 = __importDefault(require("nodemailer"));
let ContactFormsService = ContactFormsService_1 = class ContactFormsService {
    prisma;
    configService;
    logger = new common_1.Logger(ContactFormsService_1.name);
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async create(createContactFormDto) {
        const created = await this.prisma.contactForm.create({
            data: createContactFormDto,
        });
        try {
            await this.sendNotificationEmail(created);
        }
        catch (error) {
            this.logger.error('Failed to send contact form email', error);
            throw new common_1.InternalServerErrorException('Contact form saved but email sending failed.');
        }
        return created;
    }
    async findAll(query) {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);
        const skip = (page - 1) * limit;
        const where = {};
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
    async findOne(id) {
        const entry = await this.prisma.contactForm.findUnique({ where: { id } });
        if (!entry) {
            throw new common_1.NotFoundException('Contact form not found');
        }
        return entry;
    }
    async sendNotificationEmail(payload) {
        const host = this.configService.get('MAIL_HOST');
        const port = Number(this.configService.get('MAIL_PORT') || 587);
        const secure = this.configService.get('MAIL_SECURE') === 'true';
        const user = this.configService.get('MAIL_USER');
        const pass = this.configService.get('MAIL_PASS');
        const from = this.configService.get('MAIL_FROM') || user;
        const to = this.configService.get('MAIL_TO') ||
            this.configService.get('MAIL_USER');
        if (!host || !user || !pass || !from || !to) {
            this.logger.warn('MAIL configuration missing. Contact form email was skipped.');
            return;
        }
        const transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });
        const html = `
      <h2>New Contact Form Submission</h2>
      <ul>
        ${Object.entries(payload)
            .map(([key, value]) => `<li><strong>${key}</strong>: ${value ?? ''}</li>`)
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
};
exports.ContactFormsService = ContactFormsService;
exports.ContactFormsService = ContactFormsService = ContactFormsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ContactFormsService);
//# sourceMappingURL=contact-forms.service.js.map