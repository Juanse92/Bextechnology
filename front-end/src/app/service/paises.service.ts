import { Injectable } from '@angular/core';
import { Paises } from '../entities/pais';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {endPoints} from '../../environments/environment'


@Injectable()
export class PaisesService {
  private urlEndPoint: string = endPoints.PaisesService;

  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  getPaises(): Observable<Paises[]> {
    return this.http.get(`${this.urlEndPoint}/all`).pipe(
      map(response => response as Paises[])
    );
  }
  create(pais: Paises): Observable<Paises>{
    return this.http.post<Paises>(`${this.urlEndPoint}/create`,pais,{headers: this.httpHeaders} )
  }
  getPais(id):Observable<Paises>{
    return this.http.get<Paises>(`${this.urlEndPoint}/${id}`)
  }
  update(pais: Paises):Observable<Paises>{
    return this.http.put<Paises>(`${this.urlEndPoint}/update`,pais,{headers: this.httpHeaders})
  }
  delete(id:Number):Observable<Paises>{
    return this.http.delete<Paises>(`${this.urlEndPoint}/delete?id=${id}`,{headers: this.httpHeaders})
  }
}
