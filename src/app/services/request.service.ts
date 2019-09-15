import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  getData() {
    return 'service data.';
  }

  getCallbackData(callback) {
    const localData = 'service data.';

    // closure, nested function to get local data.
    return setTimeout(() => {
      callback(localData)
    }, 500)
  }

  getPromiseData() {
    const localData = 'service data.';

    return new Promise((res) => {

      setTimeout(() => {
        res(localData);
      }, 1000)
    })
  }

  getObservableData() {
    const localData = 'service data.';

    return new Observable<any>((observer) => {
      setTimeout(() => {
        observer.next(localData);
        // observer.next 相当于 promise 的 resolve
        // observer.error 相当于 promise 的 reject
      }, 1500)
    })
  }

  getObservableRepeatedData() {
    const localData = 'service data.';

    return new Observable<any>((observer) => {
      setInterval(() => {
        observer.next(localData);
      }, 1500)
    })
  }

  getObservableRepeatedNum() {
    let number = 0;

    return new Observable<any>((observer) => {
      setInterval(() => {
        number++;
        observer.next(number);
      }, 1500)
    })
  }

  constructor() { }
}
