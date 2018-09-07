import { TestBed, inject } from '@angular/core/testing';

import { BookstoreMessagesService } from './bookstore-messages.service';

describe('BookstoreMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookstoreMessagesService]
    });
  });

  it('should be created', inject([BookstoreMessagesService], (service: BookstoreMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
