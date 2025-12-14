export interface People {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    managerId: number | null;
    photoPath: string;
    type: 'Employee' | 'Partner' | string;
    status: 'Active' | 'Inactive' | string;
    workEmail?: string;
    hireDate?: Date;
    location?: string;
}

export interface FormattedPeople {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    managerId: number | null;
    photoPath: string;
    type: 'Employee' | 'Partner' | string;
    status: 'Active' | 'Inactive' | string;
    workEmail?: string;
    hireDate?: Date;
    location?: string;
    managerName: string | null;
    managedPeople: string[];
}

export type Filters = {
    department?: string;
    managerId?: string | null; // string id or null for top-level
    type?: 'Employee' | 'Partner';
    status?: 'Active' | 'Inactive';
    search?: string; // name contains (case-insensitive)
};