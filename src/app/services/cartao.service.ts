import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  constructor(private _http: HttpClient) { }

  //Adicionando dados 
  addEmp(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/items', data);
  }

  //Atualizando os dados
  updateEmp(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/items/${id}`, data);
  }

  //Listando dados na tela 
  getEmpList(): Observable<any> {
    return this._http.get('http://localhost:3000/items');
  }

  //Deletando os dados
  deleteEmp(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/items/${id}`);
  }

}
