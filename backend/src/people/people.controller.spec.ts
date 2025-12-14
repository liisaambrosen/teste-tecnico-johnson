import { PeopleController } from './people.controller';
import { People } from './interface/people.interface';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/CreatePersonDto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

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


describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

  beforeEach(async () => {
    service = {
      findAllPeople: jest.fn().mockResolvedValue(peopleArrayMock),
      createPerson: jest.fn().mockImplementation((personData: Partial<People>) => {
        const newPerson: People = {
          id: peopleArrayMock.length + 1,
          ...personData,
        } as People;
        return Promise.resolve(newPerson);
      }),
      findPersonById: jest.fn().mockImplementation((id: string) => {
        const convertId = Number(id);
        const person = peopleArrayMock.find(p => p.id === convertId);
        return Promise.resolve(person);
      }),
      updatePerson: jest.fn().mockImplementation((id: string, updateData: Partial<People>) => {
        const convertId = Number(id);
        const personIndex = peopleArrayMock.findIndex(p => p.id === convertId);
        if (personIndex === -1) return Promise.resolve(new NotFoundException(`Person with id ${id} not found`));
        const updatedPerson = { ...peopleArrayMock[personIndex], ...updateData };
        return Promise.resolve(updatedPerson);
      }),
      deletePerson: jest.fn(),
    } as any;
    controller = new PeopleController(service);
  });

  describe('findAllPeople', () => {
    it('should return an array of people', async () => {
      (service.findAllPeople as jest.Mock).mockResolvedValue(peopleArrayMock);
      const people = await controller.findAllPeople();
      expect(people).toEqual(peopleArrayMock);
      expect(service.findAllPeople).toHaveBeenCalled();
    });
  });
  describe('findPersonById', () => {
    it('should return a person by id', async () => {
      (service.findAllPeople as jest.Mock).mockResolvedValue(peopleArrayMock);
      const person = await controller.findPersonById('1');
      expect(person).toEqual(peopleArrayMock[0]);
      expect(service.findPersonById).toHaveBeenCalledWith('1');
    });
  });
  describe('createPerson', () => {
    it('should create a new person', async () => {
      const newPersonData: CreatePersonDto = {
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
      const createdPerson: People = {
        id: 3,
        ...newPersonData,
      } as People;
      (service.createPerson as jest.Mock).mockResolvedValue(createdPerson);
      const result = await controller.createPerson(newPersonData);
      expect(result).toEqual(createdPerson);
      expect(service.createPerson).toHaveBeenCalledWith(newPersonData);
    });
  });
  describe('updatePerson', () => {
    it('should update and return the person', async () => {
      const updatedData: Partial<People> = {
        status: 'Inactive',
      };
      const updatedPerson: People = {
        ...peopleArrayMock[0],
        ...updatedData,
      } as People;
      (service.updatePerson as jest.Mock).mockResolvedValue(updatedPerson);
      const result = await controller.updatePerson('1', updatedData);
      expect(result).toEqual(updatedPerson);
      expect(service.updatePerson).toHaveBeenCalledWith('1', updatedData);
    });
  it('should throw NotFoundException if person does not exist', async () => {
      const updatedData: Partial<People> = {
        status: 'Inactive',
      };
      (service.updatePerson as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Person with id 314 not found`);
      });
      await expect(controller.updatePerson('314', updatedData)).rejects.toThrow(NotFoundException);
      expect(service.updatePerson).toHaveBeenCalledWith('314', updatedData);
    });
  });
  describe('deletePerson', () => {
    it('should delete the person', async () => {
      (service.deletePerson as jest.Mock).mockResolvedValue(undefined);
      const result = await controller.deletePerson('1');
      expect(result).toBeUndefined();
      expect(service.deletePerson).toHaveBeenCalledWith('1');
    });
    it('should throw NotFoundException if person does not exist', async () => {
      (service.deletePerson as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Person with id 314 not found`);
      });
      await expect(controller.deletePerson('314')).rejects.toThrow(NotFoundException);
      expect(service.deletePerson).toHaveBeenCalledWith('314');
    });
  });
});
