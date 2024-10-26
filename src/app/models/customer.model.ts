export interface Customer {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    CreatedDate?: Date | null;
    LastUpdatedDate?: Date | null;
}