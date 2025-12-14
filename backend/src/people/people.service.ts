import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from './interface/people.interface';

@Injectable()
export class PeopleService {
    constructor(@InjectModel('People') private readonly peopleModel: Model<People>) {}

    async findAllPeople(): Promise<People[]> {
        const data = await this.peopleModel.find();
        return data;
    };

    async findPersonById(id: string): Promise<People> {
            const convertId = Number(id);
            const data = await this.peopleModel.findOne({ id: convertId });

            if (!data) {
                throw new NotFoundException(`Person with id ${id} not found`);
            }

            return data as People;
    };

    async createPerson(personData: Partial<People>): Promise<People> {
        const last = await this.peopleModel.findOne({}, { id: 1 }, { sort: { id: -1 } });
        const nextId = ((last?.id as number) ?? 0) + 1;
        const newPerson = await this.peopleModel.insertOne({ ...personData, id: nextId });
        return newPerson as People;
    };

    async updatePerson(id: string, personData: Partial<People>): Promise<People> {
        const convertId = Number(id);
        const updatedPerson = await this.peopleModel.findOneAndUpdate({ id: convertId }, { $set: personData }, { new: true });

        if (!updatedPerson) {
            throw new NotFoundException(`Person with id ${id} not found`);
        };

        return updatedPerson as People;
    };

    async deletePerson(id: string): Promise<void> {
        const convertId = Number(id);
        const deleteResult = await this.peopleModel.deleteOne({ id: convertId });

        if (deleteResult.deletedCount === 0) {
            throw new NotFoundException(`Person with id ${id} not found`);
        };
        return;
    };
 }
