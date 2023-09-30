import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartaoService } from '../services/cartao.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss']
})
export class EmpEditComponent implements OnInit {
  empForm: FormGroup;

  cardBrand: string[] = [
    'Mastecard',
    'Visa',
    'Elo',
    'Hipercard',
    'Amex'
  ]

  constructor(
    private _fb: FormBuilder, 
    private _empService: CartaoService, 
    private _dialogRef: MatDialogRef<EmpEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService

  ) {

    this.empForm = this._fb.group({
      id: '',
      merchantId: '',
      paymentNode: '',
      cnpjRoot: '',
      date: '',
      paymentType: '',
      cardBrand: '',
      authorizationCode: '',
      truncatedCardNumber: '',
      grossAmount: ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmp(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Cadastro atualizado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmp(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cadastro adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
