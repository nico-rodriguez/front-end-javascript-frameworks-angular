import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(LEADERS), 2000);
      }
    );
  }

  getLeader(id: string): Promise<Leader> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(<Leader>LEADERS.find(leader => leader.id === id)), 2000);
      }
    );
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(<Leader>LEADERS.find(({ featured }) => featured)), 2000);
      }
    );
  }
}
