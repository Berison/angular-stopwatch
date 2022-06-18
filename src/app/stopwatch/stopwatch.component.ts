import { Component, OnInit } from '@angular/core';
import { timer, fromEvent } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

export interface Timer {
  time: number
  minutes: number
  seconds: number
}

export let initialTimeState: Timer = {
  time: 0,
  minutes: 0,
  seconds: 0,
}

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})

export class StopwatchComponent implements OnInit {
  timeState = { ...initialTimeState }
  isRunning: boolean = false;
  betweenСlicksInterval: number = 500;
  buttonClick: any;

  toggle(): void {
    this.isRunning = !this.isRunning;
  }

  wait(event: any): void {
    this.buttonClick = fromEvent(event.target, 'click')
      .pipe(timeInterval())
        .subscribe(click => {
          if (click.interval < this.betweenСlicksInterval) {
            this.isRunning = false;
          }
          this.buttonClick.unsubscribe()
        })
  }

  reset(): void {
    this.isRunning = false;
    this.timeState = { ...initialTimeState };
  }

  ngOnInit(): void {
    timer(1000, 1000).subscribe(() => {
      if(this.isRunning) {
        this.timeState.time++;
        this.timeState.seconds = Math.floor(this.timeState.time % 3600 % 60);
        this.timeState.minutes = Math.floor(this.timeState.time % 3600 / 60);
      }
    });
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  };
}
