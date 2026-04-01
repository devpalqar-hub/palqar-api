import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { FormType } from '@prisma/client';

export class GetContactFormsDto {
    @ApiPropertyOptional({ enum: FormType })
    @IsOptional()
    @IsEnum(FormType)
    formType?: FormType;

    @ApiPropertyOptional({ description: 'Page number', default: 1 })
    @IsOptional()
    @IsNumberString()
    page?: string;

    @ApiPropertyOptional({ description: 'Items per page', default: 10 })
    @IsOptional()
    @IsNumberString()
    limit?: string;
}
