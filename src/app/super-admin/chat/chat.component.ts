import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }
  sendMessage()
  {
    // this.ChatService.sendMessage("hello").subscribe(res=>
    //   {
    //     console.log("chat res>>>>>");
    //   })
  }

}
