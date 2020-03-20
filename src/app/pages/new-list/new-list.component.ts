import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router) { }
  ngOnInit() {
  }

  createList(title:string){
    this.taskService.createList(title).subscribe((rep:List)=>{
      this.router.navigate(['/lists',rep._id])
    })
  }

}
