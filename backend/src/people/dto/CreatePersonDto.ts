import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonDto {
    @ApiProperty({ description: 'Full name of the person', example: 'Alex Johnson' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Department name', example: 'Executive' })
    @IsString()
    department: string

    @ApiProperty({ description: 'Person type', example: 'Employee', enum: ['Employee', 'Partner'] })
    @IsString()
    type: string;

    @ApiProperty({ description: 'Employment status', example: 'Active', enum: ['Active', 'Inactive'] })
    @IsString()
    status: string

    @ApiPropertyOptional({ description: 'Manager ID (null for top-level)', example: 1, nullable: true })
    @IsOptional()
    @IsNumber()
    managerId?: number | null;

    @ApiPropertyOptional({ description: 'Work location', example: 'New York Office' })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'Job title', example: 'General Manager' })
    @IsString() 
    jobTitle: string;

    @ApiPropertyOptional({ description: 'Work email address', example: 'alex.johnson@jnj.com' })
    @IsString()
    @IsOptional()
    workEmail?: string;

    @ApiProperty({ description: 'Path or URL to profile photo', example: '/photos/1' })
    @IsString()
    photoPath: string;

    @ApiPropertyOptional({ description: 'Hire date', example: '2020-01-15' })
    @IsString()
    @IsOptional()
    hireDate?: Date;
}
