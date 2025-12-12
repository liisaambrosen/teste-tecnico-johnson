import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './interface/people.interface';

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    async findAllPeople(): Promise<People[]> {
        return this.peopleService.findAllPeople();
    }

    @Get(':id')
    async findPersonById(@Param('id') id: string): Promise<People> {
        return this.peopleService.findPersonById(id);
    }
}
