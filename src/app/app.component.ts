import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { TableDataDto } from './models/tableDataDto';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit {

  tableDataWithoutPagination$: Observable<TableDataDto>;
  paginate: boolean = false;
  pending: boolean = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.tableDataWithoutPagination$ = this.dataService.fetchTableData();
  }

  // To fetch mock data again
  fetch() {
    this.paginate = !this.paginate;
    this.tableDataWithoutPagination$ = this.dataService.fetchTableData();
  }

  // inform parent when data will be loaded
  tableLoaded(event: boolean) {
    this.pending = event;
  }

  // emit page event if pagination is enabled (for endpoint with pagination)
  pageChange(event: PageEvent) {
   // ...
  }
}
