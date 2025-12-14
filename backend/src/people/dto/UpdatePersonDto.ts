import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePersonDto } from './CreatePersonDto';

export class UpdatePersonDto extends PartialType(
    OmitType(CreatePersonDto, ['hireDate'] as const),
) {}