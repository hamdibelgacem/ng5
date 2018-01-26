import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations'
import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {
  
  itemCount: number =0;
  btnText: String = 'Add an item';
  goalText: String = 'My First life goal';
  goals = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this.dataService.goal.subscribe(
      res => this.goals = res
    )
    this.dataService.changeGoal(this.goals)
  }
  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this.dataService.changeGoal(this.goals)
  }

  removeItem(i){
    this.goals.splice(i,1)
    this.dataService.changeGoal(this.goals)
  }

}
