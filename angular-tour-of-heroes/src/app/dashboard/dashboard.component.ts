import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { FormService } from '../form.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  apna_forms: Form[] = [];
  myGroup: FormGroup;
  submitted: boolean = false;
  showMsg: string = '';
  


  constructor(
    private formService: FormService
    ) { }

  ngOnInit() {
    this.get_init();
    
    this.myGroup= new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      feedback: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
   });
  }

  updateName() {
    this.myGroup.setValue(this.apna_forms);
  }

  get name() { return this.myGroup.get('name'); }

  get email() { return this.myGroup.get('email'); }

  get feedback() { return this.myGroup.get('feedback'); }

  private get_init(): void {
    this.formService.get_init()
      .subscribe(forms => {this.apna_forms = forms; 
        this.updateName()
        console.log(forms['name']);});
  }

  public OnSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.myGroup.value);
    this.formService.submitForm(this.myGroup.value).subscribe(
      forms => {
        console.log(forms);
        this.showMsg= this.formService.ShowMsg;
      });
  }
}