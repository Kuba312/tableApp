import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableDataDto } from '../models/tableDataDto';

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private http: HttpClient) { }
    

    fetchTableData(): Observable<TableDataDto> {
        return this.http.get<TableDataDto>('assets/mock-data.json');
    }
}