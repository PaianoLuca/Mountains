import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mountain } from '../models/mountain';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MountainService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/mountains';

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
    return this.http.post<{data: Mountain}>(`${this.apiUrl}/create`, data)
    .pipe(
      map(response => response.data)
    );
  }

  update(id: number, data: Partial<Mountain>): Observable<Mountain> {
    return this.http.put<{data: Mountain}>(`${this.apiUrl}/edit/${id}`, data)
    .pipe(
      map(response => response.data)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}