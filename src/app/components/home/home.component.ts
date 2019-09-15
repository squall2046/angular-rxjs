import { Component, OnInit } from '@angular/core';

import { RequestService } from '../../services/request.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public request: RequestService) { }

  ngOnInit() {
    // 1. 同步方法
    let data = this.request.getData();
    console.log('1.Synchronous function to get', data)

    // 2. Callback
    this.request.getCallbackData((data) => {
      console.log('2.Asynchronous callback function to get', data)
    })

    // 3. Promise
    let promiseData = this.request.getPromiseData();
    promiseData.then((data) => {
      console.log('3.Asynchronous promise to get', data)
    })

    // 4. Observable (Rxjs)
    let observableData = this.request.getObservableData();
    observableData.subscribe((data) => {
      // .subscribe 相当于 promise 的 .then
      console.log('4.Asynchronous Observable to get', data)
    })

    // 5. Observable 中途撤回, promise 无法实现.
    let observableData2 = this.request.getObservableData();
    let ob2 = observableData2.subscribe((data) => {
      console.log('5.Asynchronous Observable to get', data)
    })

    setTimeout(() => {
      ob2.unsubscribe()
      // 在getObservableData()执行(1.5秒)之前(1秒)取消订阅
    }, 1000);


    // 6. Observable 多次执行, promise 无法实现.
    // let observableData3 = this.request.getObservableRepeatedData();
    // let count = 0;
    // observableData3.subscribe((data) => {
    //   count++;
    //   console.log('6.' + count + ': Asynchronous Observable to get', data)
    // })

    // 7. Observable 多次执行 + 使用工具函数 filter
    // let observableData4 = this.request.getObservableRepeatedNum();
    // observableData4.pipe(
    //   filter((num) => {
    //     if (num % 2 == 0) {
    //       return true;
    //     }
    //   })
    // )
    //   .subscribe((data) => {
    //     console.log(data)
    //   })

    // 8. Observable 多次执行 + 使用工具函数 map
    // let observableData5 = this.request.getObservableRepeatedNum();
    // observableData5.pipe(
    //   map((num) => {
    //       return num*num;
    //   })
    // )
    //   .subscribe((data) => {
    //     console.log(data)
    //   })

    // 9. Observable 多次执行 + 使用工具函数 filter & map
    let observableData6 = this.request.getObservableRepeatedNum();
    observableData6.pipe(
      filter((num) => {
        if (num % 2 == 0) {
          return true;
        }
      }),
      map((num) => {
        return num * num;
      })
    )
      .subscribe((data) => {
        console.log(data)
      })
  }
}
