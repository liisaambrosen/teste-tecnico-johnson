import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleSchema } from './schema/people.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'People', schema: PeopleSchema }])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {}
