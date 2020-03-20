import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService:WebRequestService) { }

  getList(){
    return this.webService.get('lists');
  }

  createList(title:string){
    return this.webService.post('lists',{title});
  }

  getTasks(listId:string){
    return this.webService.get(`lists/${listId}/tasks`)
  }

  createTask(title:string,listId:string){
    return this.webService.post(`lists/${listId}/tasks`,{title})
  }

  complete(task:Task){
    return this.webService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed:true
    })
  }

  deleteList(listId:string){
    return this.webService.delete(`lists/${listId}`)
  }

  updateList(listId:string,title:string){
    return this.webService.patch(`lists/${listId}`,{title});
  }

  deleteTask(listId:string,taskId:String){
    return this.webService.delete(`lists/${listId}/tasks/${taskId}`)
  }

  updateTask(listId:string,taskId:String,title:string){
    return this.webService.patch(`lists/${listId}/tasks/${taskId}`,{title});
  }
}
