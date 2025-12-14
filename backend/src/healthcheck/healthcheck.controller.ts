import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('healthcheck')
export class HealthcheckController {
    @Get('')
    @ApiOperation({ summary: 'Health check', description: 'Checks if the API is running and healthy' })
    @ApiResponse({ status: 200, description: 'API is healthy', schema: { example: { status: 'All OK!' } } })
    healthcheck() {
        return { status: 'All OK!' };
    }
}
