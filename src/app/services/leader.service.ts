import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS)
      // Simulate server latency
      .pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return of(<Leader>LEADERS.find(leader => leader.id === id))
      // Simulate server latency
      .pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(<Leader>LEADERS.find(({ featured }) => featured))
      // Simulate server latency
      .pipe(delay(2000));
  }
}
