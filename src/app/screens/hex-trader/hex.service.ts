import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from './hex.model';

@Injectable({
  providedIn: 'root'
})
export class HexService {

  baseUrl = 'http://192.168.1.244:3200'

  constructor(private http: HttpClient) { }

  getModels(): Observable<any> {
    const URL = `${this.baseUrl}/models`
    return this.http.get<any>(URL);
  }

  getScores(limit: number = 50): Observable<Score[]> {
    const URL = `${this.baseUrl}/scores/top?limit=${limit}`
    return this.http.get<Score[]>(URL);
  }


  getScoresByModel(modelId: string): Observable<Score[]> {
    const URL = `${this.baseUrl}/scores/${modelId}`
    return this.http.get<Score[]>(URL);
  }

  testNewStuff(modelId: string, start: string, end: string): Observable<void> {
    const URL = `http://192.168.1.250:2800/run?model=${modelId}&start=${start}&end=${end}`
    return this.http.get<void>(URL);
  }

  getMili(mili: number): Observable<any> {
    const URL = `http://192.168.1.250:3100/data/next/${mili - 1}`
    return this.http.get<any>(URL);
  }
}
