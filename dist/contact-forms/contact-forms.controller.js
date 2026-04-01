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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFormsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_forms_service_1 = require("./contact-forms.service");
const create_contact_form_dto_1 = require("./dto/create-contact-form.dto");
const get_contact_forms_dto_1 = require("./dto/get-contact-forms.dto");
let ContactFormsController = class ContactFormsController {
    contactFormsService;
    constructor(contactFormsService) {
        this.contactFormsService = contactFormsService;
    }
    create(createContactFormDto) {
        return this.contactFormsService.create(createContactFormDto);
    }
    async findAll(query) {
        return this.contactFormsService.findAll(query);
    }
    findOne(id) {
        return this.contactFormsService.findOne(id);
    }
};
exports.ContactFormsController = ContactFormsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a contact form submission' }),
    (0, swagger_1.ApiBody)({ type: create_contact_form_dto_1.CreateContactFormDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Contact form submission stored successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_form_dto_1.CreateContactFormDto]),
    __metadata("design:returntype", void 0)
], ContactFormsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contact form submissions' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of contact form submissions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_contact_forms_dto_1.GetContactFormsDto]),
    __metadata("design:returntype", Promise)
], ContactFormsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a contact form submission by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Contact form id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Contact form submission details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactFormsController.prototype, "findOne", null);
exports.ContactFormsController = ContactFormsController = __decorate([
    (0, swagger_1.ApiTags)('contact-forms'),
    (0, common_1.Controller)('contact-forms'),
    __metadata("design:paramtypes", [contact_forms_service_1.ContactFormsService])
], ContactFormsController);
//# sourceMappingURL=contact-forms.controller.js.map