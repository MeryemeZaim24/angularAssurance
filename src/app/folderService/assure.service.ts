import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Assure}from '../class/assure'
@Injectable({
  providedIn: 'root'
})
export class AssureService {
  private baseUrl = 'http://localhost:8080/api/assures';
  // private baseUrl = 'http://localhost:8081/api/assures';



  constructor(private http: HttpClient) { }

  getAllAssures(): Observable<Assure[]> {
    return this.http.get<Assure[]>(`${this.baseUrl}`);
  }

  createAssure(assure: Assure): Observable<Assure> {
    return this.http.post<Assure>(`${this.baseUrl}`, assure);
  }
  updateAssure(id: number, assure: Assure): Observable<Assure> {
    return this.http.put<Assure>(`${this.baseUrl}/${id}`, assure);
  }
  

  deleteAssure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getContratsByAssureId(assureId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/contrats/assure/${assureId}`);
    // return this.http.get<any[]>(`http://localhost:8083/api/contrats/assure/${assureId}`);
  }
  searchAssures(keyword: string): Observable<Assure[]> {
    return this.http.get<Assure[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
  filterAssuresByDate(startDate: string, endDate: string): Observable<Assure[]> {
    return this.http.get<Assure[]>(`${this.baseUrl}/filterByDate?startDate=${startDate}&endDate=${endDate}`);
  }
  filterAssuresByCin(cin: string): Observable<Assure[]> {
    return this.http.get<Assure[]>(`${this.baseUrl}/filterByCin?cin=${cin}`);
  }
  getAssureCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/assures/count`);
  }
  getAssureById(assureId: number): Observable<Assure> {
    return this.http.get<Assure>(`${this.baseUrl}/${assureId}`);
  }

}
