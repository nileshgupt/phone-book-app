import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { Router } from '@angular/router';
import { animation, trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-phone-record',
  templateUrl: './phone-record.component.html',
  styleUrls: ['./phone-record.component.css'],
  animations: [trigger('toggle', [
    state("true", style({
      height: '0',
      overflow: "hidden"
    }))
    , state("false", style({
      minHeight: 0
    })
    ),transition('*=>*',[animate(200)])
  ])]
})
export class PhoneRecordComponent implements OnInit {

  // These are the input fields whose values are set via parent and these values are rendered in the view
  @Input() ContactModel: ContactModel;
  @Input() referenceId:String;

  //Event emitter when delete event is generated
  @Output() deleteEvent = new  EventEmitter<String>();


  toggleState = "true"
  showDeleteIndicator = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.ContactModel)
  }

  editContact() {
    //Navigate to edit 
    this.router.navigate(['editContact', this.ContactModel._id])
  }
  deleteContact() {
    this.showDeleteIndicator = true;
    this.deleteEvent.emit(this.ContactModel._id);
  }

  // Toggle state for animation
  changeState() {
    if (this.toggleState == "false") {
      this.toggleState = "true"
    } else {
      this.toggleState = "false"
    }
  }

}
