import { Injectable } from '@angular/core';
import { Departamento } from '../entities/departamento';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {endPoints} from '../../environments/environment'


@Injectable()
export class DepartamentoService {
  private urlEndPoint: string = endPoints.DepartamentoService;

  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get(`${this.urlEndPoint}/all`).pipe(
      map(response => response as Departamento[])
    );
  }
  create(departamento: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(`${this.urlEndPoint}/create`,departamento,{headers: this.httpHeaders} )
  }
  getDepartamento(id):Observable<Departamento>{
    return this.http.get<Departamento>(`${this.urlEndPoint}/${id}`)
  }
  update(departamentos: Departamento):Observable<Departamento>{
    return this.http.put<Departamento>(`${this.urlEndPoint}/update`,departamentos,{headers: this.httpHeaders})
  }
  delete(id:Number):Observable<Departamento>{
    return this.http.delete<Departamento>(`${this.urlEndPoint}/delete?id=${id}`,{headers: this.httpHeaders})
  }
}
