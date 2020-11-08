import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/httpService';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //this array contains all the data that is fetched from the server
  allContacts: ContactModel[] = [];

  pagenatedResults: ContactModel[][] = [];

  totalPages = 0;
  currentPage = 0;

  showLoader:boolean = true

  showSearchBox = true


  searchForm: FormGroup;

  searchResults:ContactModel[] = []
  
  constructor(private httpService: HttpService) {
    
   }

   // this function pagenates the array
   pagenateResults(array:ContactModel[]){

    //to temporarily store the data
    this.pagenatedResults = []
    let onepage:ContactModel[] = [];
    let pageCounter = 0;

    //Iterate over all the contacts and create arrays
    for(let i = 0 ; i < array.length ; i++ ){
      if((i+1)%4==0){
        onepage.push(array[i]);
        this.pagenatedResults.push(onepage);
        onepage = [];
        pageCounter++;
        continue;
      }
      onepage.push(array[i])
    }
    
    this.pagenatedResults.push(onepage)
    this.totalPages = this.pagenatedResults.length;
    
   }

   //Called by pagenation tabs
   choosePage(value){
      this.currentPage = value;
      
   }

   // To remove a contact from page as well as to generate a delete request
   deleteContact(id){
     
     this.httpService.deleteContact(id).subscribe((result)=>{
       if(result['status']=='success'){
        let index = 0;
        console.log("Delete",id)
       
        this.allContacts = this.allContacts.filter((element)=>{
          if(element._id!=id){
            return element;
          }
        })

        this.searchResults = this.searchResults.filter(element=>{
          if(element._id != id){
            return element;
          }
        })

        //After deletion, pagenate the remaining elements
        this.pagenateResults(this.allContacts);
       }


     })
   }
   // Pagenation controls
   nextPage(){
      if(this.currentPage + 1 < this.pagenatedResults.length){
        this.currentPage ++;
      }
   }
   previousPage(){
    if(this.currentPage - 1 >= 0){
      this.currentPage--;
    }
   }

   search(event){
     let query = event.target.value;

     // If the query is empty then clear the search results to refresh
     if(query=="")
     {
       this.searchResults = [];
       return;
     }
     console.log(query);
     this.httpService.searchContact(query).subscribe((result:ContactModel[])=>{
       this.searchResults = result
     })
   }

   clearSearch(){
     this.searchResults
      = [];
      this.showSearchBox = false;
   }

  ngOnInit(): void {

    // when the component is initialized, fetch the contacts from the server
    this.searchForm = new FormGroup({})
    this.httpService.getContacts().subscribe((result: ContactModel[])=>{
      console.log(result)
      this.allContacts = result;
      this.pagenateResults(this.allContacts);
      // Hide the loader
      this.showLoader = false;
    })
  }

}
