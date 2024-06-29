import { Injectable } from '@angular/core';
import { Ciudad } from '../entities/ciudad';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {endPoints} from '../../environments/environment'


@Injectable()
export class CiudadService {
  private urlEndPoint: string = endPoints.CiudadService;

  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get(`${this.urlEndPoint}/all`).pipe(
      map(response => response as Ciudad[])
    );
  }
  create(ciudad: Ciudad): Observable<Ciudad>{
    return this.http.post<Ciudad>(`${this.urlEndPoint}/create`,ciudad,{headers: this.httpHeaders} )
  }
  getCiudad(id):Observable<Ciudad>{
    return this.http.get<Ciudad>(`${this.urlEndPoint}/${id}`)
  }
  update(ciudades: Ciudad):Observable<Ciudad>{
    return this.http.put<Ciudad>(`${this.urlEndPoint}/update`,ciudades,{headers: this.httpHeaders})
  }
  delete(id:Number):Observable<Ciudad>{
    return this.http.delete<Ciudad>(`${this.urlEndPoint}/delete?id=${id}`,{headers: this.httpHeaders})
  }
}
