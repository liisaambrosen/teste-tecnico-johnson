export interface People {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    managerId?: string | null;
    photoPath: string;
    type: string;
    status: string;
    workEmail?: string;
    hireDate?: Date;
    location?: string;
}