import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { EMPTY, Subscription, catchError, delay, of } from 'rxjs';
import { UserDto } from 'src/app/models/userDto';
import { TableDataDto } from '../../../models/tableDataDto';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialTableComponent implements OnChanges, OnInit, OnDestroy {

  readonly MOCK_DELAY_ENDPOINT = 2000;

  @Input() paginate: boolean = true;
  @Input() dataCount?: number;
  @Input() pageSize?: number = 10;
  @Input() tableData?: TableDataDto;
  @Input() pending: boolean = false;

  dataSource: TableVirtualScrollDataSource<UserDto> | MatTableDataSource<UserDto>
    = this.paginate ? new MatTableDataSource([]) : new TableVirtualScrollDataSource([]);
  breakpoints = [
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape
  ];

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() tableDataLoaded = new EventEmitter<boolean>();

  displayedColumns: string[] | undefined;
  tvsItemSize: number;
  subscription: Subscription;

  constructor(private responsive: BreakpointObserver, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.screenSizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.loadTableData();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  change(event: PageEvent) {
    if (this.paginate) {
      this.pageChange.emit(event);
    }
  }

  private loadTableData() {
    this.pending = true;
    this.tableDataLoaded.emit(this.pending);
    this.initializeInitialStateOfTable();

    this.subscription = of(this.tableData)
      ?.pipe(
        delay(this.MOCK_DELAY_ENDPOINT),
        catchError((err) => {
          console.error('Error occurred while fetching table data:', err);
          this.pending = false;
          this.tableDataLoaded.emit(this.pending);
          return EMPTY;
        })
      )
      .subscribe((data: TableDataDto) => {
        const tableDataRows = data?.rows;

        this.dataSource = !this.paginate
          ? new TableVirtualScrollDataSource<UserDto>(tableDataRows)
          : new MatTableDataSource<UserDto>(tableDataRows);

        if (this.paginate) {
          this.dataCount = tableDataRows?.length;
        }

        this.displayedColumns = data?.columns;
        this.pending = false;
        this.tableDataLoaded.emit(this.pending);
        this.cdr.detectChanges();
      });
  }

  private screenSizeObserver() {
    this.subscription = this.responsive.observe([...this.breakpoints])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        this.tvsItemSize = breakpoints[Breakpoints.HandsetLandscape]
          || breakpoints[Breakpoints.HandsetPortrait]
          || breakpoints[Breakpoints.TabletPortrait]
          ? 320
          : 30;
        this.cdr.detectChanges();
      });
  }

  private initializeInitialStateOfTable() {
    if (!this.paginate) {
      this.dataSource = new TableVirtualScrollDataSource([]);
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }

}
