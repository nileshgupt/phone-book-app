import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpService } from 'src/app/services/httpService';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { ContactModel } from 'src/app/interfaces/contactModel';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  editFormGroup: FormGroup;
  contactId: string;

  //Flags for error messages
  showAlreadyExistsError = false;
  showSuccessMessage = false;


  constructor(private router: Router, private routerSnapShot: ActivatedRoute, private http: HttpService, private formBuilder: FormBuilder) {


    //Create the basic structure of the form
    this.editFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: this.formBuilder.array([]),
      emails: this.formBuilder.array([])
    });



  }
  addPhoneInput(value) {
    const newInputControl = this.formBuilder.control(value, [Validators.required]);
    this.getPhoneInputsArray.push(newInputControl);
  }
  addEmailInput(value) {
    const newInputControl = this.formBuilder.control(value, [Validators.required, Validators.email]);
    this.getEmailInputsArray.push(newInputControl);
  }

  //Get the email inputs as FromArray
 get getEmailInputsArray() {
    return this.editFormGroup.get('emails') as FormArray;
  }


  //Get the phone number inputs are FormArray
  get getPhoneInputsArray() {
    return this.editFormGroup.get('phoneNumber') as FormArray;
  }


  //To delete a phone number input
  deleteNumber(index) {

    this.getPhoneInputsArray.removeAt(index);
    console.log(this.getPhoneInputsArray.length);
    if (this.getPhoneInputsArray.length == 0) {
      this.addPhoneInput('');
    }
  }

  //To remove an email input, if there are no inputs in from after removing an input, an input is added
  deleteEmail(index) {
    this.getEmailInputsArray.removeAt(index);
    if (this.getEmailInputsArray.length == 0) {
      this.addEmailInput('');
    }
  }

  ngOnInit(): void {

    //Get the contactId fromt the route params
    this.contactId = this.routerSnapShot.snapshot.paramMap.get('id');

    //Get the contact details
    this.http.getSingleContact(this.contactId).subscribe((result: ContactModel) => {

      //Populate the form controls with data
      this.editFormGroup.get('name').setValue(result.name);
      this.editFormGroup.get('dateOfBirth').setValue(result.dateOfBirth);

      result.email.forEach((element, index, array) => {
        this.addEmailInput(element);
      });

      result.phoneNumber.forEach((element, index, array) => {
        this.addPhoneInput(element);
      });

    });
  }

  onSubmit() {

    //Get all the form values
    const name = this.editFormGroup.get('name').value;
    const dateOfBirth = this.editFormGroup.get('dateOfBirth').value;
    const phoneNumber = this.editFormGroup.get('phoneNumber').value;
    const email = this.editFormGroup.get('emails').value;
    let _id = this.contactId;

    //Create a contact model
    const requestForUpdate: ContactModel = {
      name,
      dateOfBirth,
      phoneNumber,
      email,
      _id: this.contactId
    };
  
    this.http.updateContact(requestForUpdate).subscribe(result => {
    

      // If the result exists, show the appropriate banners
      if (result['status'] =='exists') {

        this.showAlreadyExistsError = true;
        setTimeout(() => {this.showAlreadyExistsError = false;}, 5000);

      } else {

        this.showSuccessMessage = true;
        this.showAlreadyExistsError = false;
        this.editFormGroup.reset();
        setTimeout(() => {this.showSuccessMessage = false;}, 5000);

      }
    });
  }

}
