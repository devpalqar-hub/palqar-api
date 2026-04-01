"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Contact Form API')
        .setDescription('API for submitting and managing contact form entries')
        .setVersion('1.0.0')
        .addTag('contact-forms')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    const baseUrl = `http://localhost:${port}`;
    console.log(`\nAPI running at:    ${baseUrl}`);
    console.log(`Swagger docs at:   ${baseUrl}/docs\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map