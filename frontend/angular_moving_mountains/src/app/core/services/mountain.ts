import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mountain } from '../models/mountain';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MountainService {
  private http = inject(HttpClient);
  private apiUrl = '/api/mountains';

  all(): Observable<Mountain[]> {
    return this.http.get<{data: Mountain[]}>(`${this.apiUrl}/all`)
    .pipe(
      map(response => response.data)
    );
  }

  get(id: number): Observable<Mountain> {
    return this.http.get<{data: Mountain}>(`${this.apiUrl}/get/${id}`)
    .pipe(
      map(response => response.data)
    );
  }

  create(data: Partial<Mountain>): Observable<Mountain> {
    return this.http.post<Mountain>(`${this.apiUrl}/create`, data);
  }

  update(id: number, data: Partial<Mountain>): Observable<Mountain> {
    return this.http.put<Mountain>(`${this.apiUrl}/edit/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}