import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const page = [
      {
        'width': '4',
        'cptList': [
          'drag1',
          'drag2',
          'drag3'
        ]
      },
      {
        'width': '4',
        'cptList': [
          'drag4',
          'drag5',
          'drag6'
        ]
      },
      {
        'width': '4', 
        'cptList': [
          'drag7',
          'drag8',
          'drag9'
        ]
      }
    ];
    const save = {result: '200'};
    return {page, save};
  }
}
