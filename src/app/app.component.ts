import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { CartaoService } from './services/cartao.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'dashboard';

  displayedColumns: string[] = [
    'id',
    'merchantId',
    'paymentNode',
    'cnpjRoot',
    'date'
  ];

  displayedColumns2: string[] = [
    'paymentType',
    'cardBrand',
    'authorizationCode',
    'truncatedCardNumber',
    'grossAmount'
  ];

  displayedColumns3: string[] = [
    'netAmount',
    'terminal',
    'administrationFee',
    'channelCode',
    'channel'
  ];

  displayedColumns4: string[] = [
    'withdrawAmount',
    'minimumMDRAmmount',
    'mdrTaxAmount',
    'mdrFeeAmount',
    'status'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: CartaoService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }

  getEmpList() {
    this._empService.getEmpList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id: number) {
    this._empService.deleteEmp(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Cadastro apagado!', 'OK');
        this.getEmpList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }

}
