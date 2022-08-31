import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_EVENT } from '../graphql/graphql.queries';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private apollo: Apollo) {}

  createEvent(title: string, price: number, description: string, date: string) {
    return this.apollo.mutate({
      mutation: CREATE_EVENT,
      variables: {
        title,
        price,
        description,
        date,
      },
      
    });
  }
}
