import * as mongoose from 'mongoose';

export const PeopleSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: true },
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    managerId: { type: Number, required: true, default: null },
    photoPath: { type: String, required: true }, 
    type: { type: String, required: true },
    status: { type: String, required: true },
    workEmail: { type: String, required: false },
    hireDate: { type: Date, required: false  },
    location: { type: String, required: false  },
}, { collection: 'people' })

PeopleSchema.index({ id: 1 });