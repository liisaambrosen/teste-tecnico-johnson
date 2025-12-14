import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UpdatePersonDto } from './dto/UpdatePersonDto';
import { People } from './interface/people.interface';
import { PeopleService } from './people.service';

const peopleArrayMock: People[] = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Engineering',
    type: 'Employee',
    status: 'Active',
    managerId: null,
    location: 'New York',
    jobTitle: 'Software Engineer',
    workEmail: 'johndoe@jnj.com',
    photoPath: '/images/johndoe.jpg',
    hireDate: new Date('2020-01-15'),
  },
  {
    id: 2,
    name: 'Jane Smith',
    department: 'Marketing',
    type: 'Partner',
    status: 'Active',
    managerId: 1,
    location: 'San Francisco',
    jobTitle: 'Marketing Manager',
    workEmail: 'janesmith@jnj.com',
    photoPath: '/images/janesmith.jpg',
    hireDate: new Date('2019-03-22'),
  },
];

const newPersonMock: Partial<People> = {
  name: 'Alice Johnson',
  department: 'Sales',
  type: 'Employee',
  status: 'Active',
  managerId: 2,
  location: 'Chicago',
  jobTitle: 'Sales Executive',
  workEmail: 'alice@jnj.com',
  photoPath: '/images/alice.jpg',
  hireDate: new Date('2021-06-10'),
};

describe('PeopleService', () => {
  let service: PeopleService;
  let repository: any;

  beforeEach(async () => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn().mockImplementation(({ id }) => {
        const person = peopleArrayMock.find(p => p.id === id);
        return Promise.resolve(person);
      }),
      insertOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
    } as any;
    service = new PeopleService(repository);
  });

  describe('findAllPeople', () => {
    it('should return an array of people', async () => {
      (repository.find as jest.Mock).mockResolvedValue(peopleArrayMock);
      const people = await service.findAllPeople();
      expect(people).toEqual(peopleArrayMock);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('findPersonById', () => {
    it('should return a person by id', async () => {
      (repository.find as jest.Mock).mockResolvedValue(peopleArrayMock);
      const person = await service.findPersonById('1');
      expect(person).toEqual(peopleArrayMock[0]);
      expect(repository.findOne).toHaveBeenCalledWith({ id: 1 });
    });
    it('should throw NotFoundException if person does not exist', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.findPersonById('314')).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ id: 314 });
    });
  });
  describe('createPerson', () => {
    it('should create and return a new person', async () => {
      (repository.insertOne as jest.Mock).mockReturnValue({
        ...newPersonMock, id: 3 });
      (repository.findOne as jest.Mock).mockResolvedValue(peopleArrayMock[1]);
      const createdPerson = await service.createPerson(newPersonMock);
      expect(createdPerson).toEqual({
        id: 3,
        ...newPersonMock,
      });
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.insertOne).toHaveBeenCalledWith({
        ...newPersonMock,
        id: 3,
      });
    });
  });
  describe('updatePerson', () => {
    it('should update and return the person', async () => {
      const updatedData: UpdatePersonDto = {
        status: 'Inactive',
        department: 'HR',
      };
      (repository.findOneAndUpdate as jest.Mock).mockResolvedValue({
        ...peopleArrayMock[0],
        ...updatedData,
      });
      const updatedPerson = await service.updatePerson('1', updatedData);
      expect(updatedPerson).toEqual({
        ...peopleArrayMock[0],
        ...updatedData,
      });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { id: 1 },
        { $set: updatedData },
        { new: true },
      );
    });
    it('should throw NotFoundException if person does not exist', async () => {
      (repository.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(service.updatePerson('314', { status: 'Inactive' })).rejects.toThrow(NotFoundException);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { id: 314 },
        { $set: { status: 'Inactive' } },
        { new: true },
      );
    });
  });
  describe('deletePerson', () => {
    it('should delete the person', async () => {
      (repository.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });
      await service.deletePerson('1');
      expect(repository.deleteOne).toHaveBeenCalledWith({ id: 1 });
    });
    it('should throw NotFoundException if person does not exist', async () => {
      (repository.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 0 });
      await expect(service.deletePerson('314')).rejects.toThrow(NotFoundException);
      expect(repository.deleteOne).toHaveBeenCalledWith({ id: 314 });
    });
  });
});