import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  title:List[];
  tasks:Task[];
  selectedListId:string;

  constructor(private taskService:TaskService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      if(params.listId){
        this.selectedListId = params.listId
        this.taskService.getTasks(params.listId).subscribe((task:Task[])=>{
          this.tasks =task;
        })
      }else{
        this.tasks = undefined;
      }
      
    })
    
  this.taskService.getList().subscribe((list :List[])=>{
    this.title = list;
  })
  }

  onTaskClick(task:Task){
    this.taskService.complete(task).subscribe(()=>{
      task.completed = !task.completed;
    })
  }


  onClickDeleteList(){
    this.taskService.deleteList(this.selectedListId).subscribe((res)=>{
      this.router.navigate(['/lists'])
      console.log(res)
    })
  }

  deleteTask(id:string){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((res)=>{
      this.tasks = this.tasks.filter(val=>val._id !== id)
      console.log(res)
    })
  }

}
