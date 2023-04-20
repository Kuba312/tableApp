import { UserDto } from "./userDto";

export interface TableDataDto {
    rows: UserDto[];
    columns: string[];
}