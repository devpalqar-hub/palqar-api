import { FormType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateContactFormDto {
    @ApiPropertyOptional({ enum: FormType })
    @IsOptional()
    @IsEnum(FormType)
    formType?: FormType;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    companyBrandName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    designationRole?: string;

    @ApiPropertyOptional({ format: 'email' })
    @IsOptional()
    @IsEmail()
    emailAddress?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    serviceInterested?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    budget?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    projectTimelineExpectedStart?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    messageBrief?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    clientId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    typeOfIssue?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    partnershipType?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    existingClientsOrKeyMarkets?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    websitePortfolio?: string;
}
