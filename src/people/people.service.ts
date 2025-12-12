import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from './interface/people.interface';

@Injectable()
export class PeopleService {
    constructor(@InjectModel('People') private readonly peopleModel: Model<People>) {}

    async findAllPeople(): Promise<People[]> {
        const data = await this.peopleModel.find();
        return data;
    }

    async findPersonById(id: string): Promise<People> {
        try {
            console.log('Buscando por id:', id);
            const convertId = Number(id);
            const data = await this.peopleModel.findOne({ id: convertId });
            if (!data) {
                throw new Error('Person not found');
            }
            return data as People;
        } catch (error) {
            throw new Error('Failed to find person: ' + error.message);
        }
    }
 }
