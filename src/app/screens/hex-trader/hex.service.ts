import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from './hex.model';

@Injectable({
  providedIn: 'root'
})
export class HexService {

  baseUrl = 'http://192.168.1.250:3200'

  constructor(private http: HttpClient) { }

  getModels(): Observable<any> {
    const URL = `${this.baseUrl}/models`
    return this.http.get<any>(URL);
  }

  getScores(limit: number = 50): Observable<Score[]> {
    const URL = `${this.baseUrl}/scores/top?limit=${limit}`
    return this.http.get<Score[]>(URL);
  }
}
