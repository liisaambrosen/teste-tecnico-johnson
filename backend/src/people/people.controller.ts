import { Controller, Get, Param, Body, Post, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { People } from './interface/people.interface';
import { CreatePersonDto } from './dto/CreatePersonDto';
import { UpdatePersonDto } from './dto/UpdatePersonDto';

@ApiTags('people')
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    @ApiOperation({ summary: 'Get all people', description: 'Retrieves a list of all people in the organization' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all people' })
    async findAllPeople(): Promise<People[]> {
        return this.peopleService.findAllPeople();
    };

    @Get(':id')
    @ApiOperation({ summary: 'Get person by ID', description: 'Retrieves a specific person by their ID' })
    @ApiParam({ name: 'id', description: 'Person ID', example: '1' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved person' })
    @ApiResponse({ status: 404, description: 'Person not found' })
    async findPersonById(@Param('id') id: string): Promise<People> {
        return this.peopleService.findPersonById(id);
    };

    @Post('new')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create new person', description: 'Creates a new person in the organization' })
    @ApiBody({ type: CreatePersonDto })
    @ApiResponse({ status: 201, description: 'Person successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async createPerson(@Body() personData: CreatePersonDto): Promise<People> {
        return this.peopleService.createPerson(personData);
    };

    @Patch('update/:id')
    @ApiOperation({ summary: 'Update person', description: 'Updates an existing person\'s information' })
    @ApiParam({ name: 'id', description: 'Person ID', example: '1' })
    @ApiBody({ type: UpdatePersonDto })
    @ApiResponse({ status: 200, description: 'Person successfully updated' })
    @ApiResponse({ status: 404, description: 'Person not found' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async updatePerson(@Param('id') id: string, @Body() personData: UpdatePersonDto): Promise<People> {
        return this.peopleService.updatePerson(id, personData);
    };

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete person', description: 'Removes a person from the organization' })
    @ApiParam({ name: 'id', description: 'Person ID', example: '1' })
    @ApiResponse({ status: 204, description: 'Person successfully deleted' })
    @ApiResponse({ status: 404, description: 'Person not found' })
    async deletePerson(@Param('id') id: string): Promise<void> {
        return this.peopleService.deletePerson(id);
    };
}
