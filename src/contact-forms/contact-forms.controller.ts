import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { ContactFormsService } from './contact-forms.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { GetContactFormsDto } from './dto/get-contact-forms.dto';

@ApiTags('contact-forms')
@Controller('contact-forms')
export class ContactFormsController {
    constructor(private readonly contactFormsService: ContactFormsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a contact form submission' })
    @ApiBody({ type: CreateContactFormDto })
    @ApiCreatedResponse({
        description: 'Contact form submission stored successfully',
    })
    create(@Body() createContactFormDto: CreateContactFormDto) {
        return this.contactFormsService.create(createContactFormDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all contact form submissions' })
    @ApiOkResponse({ description: 'List of contact form submissions' })
    async findAll(@Query() query: GetContactFormsDto) {
        return this.contactFormsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a contact form submission by id' })
    @ApiParam({ name: 'id', description: 'Contact form id' })
    @ApiOkResponse({ description: 'Contact form submission details' })
    findOne(@Param('id') id: string) {
        return this.contactFormsService.findOne(id);
    }
}
