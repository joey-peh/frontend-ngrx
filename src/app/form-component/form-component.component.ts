import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { User } from '../state/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, of, startWith } from 'rxjs';
import { userFeature } from '../state/user.reducer';
import { userAction } from '../state/user.action';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    MatCardModule, ReactiveFormsModule, MatButtonModule, HttpClientModule, MatAutocompleteModule],
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css', '../app.component.css']
})
export class FormComponentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, private readonly store: Store,
    public dialogRef: MatDialogRef<FormComponentComponent>
  ) {
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get address() {
    return this.userForm.get('address');
  }

  readonly suggestions$ = this.store.select(userFeature.selectAllAddress);

  userForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required)
  });
  filteredOptions?: Observable<string[]> = of([]);
  selectedOption?: string;

  ngOnInit(): void {
    this.suggestions$.subscribe((data) => {
      if (this.address?.value && this.address?.value.trim() != '') {
        //hackish way to not show suggestion list on second creation
        this.filteredOptions = of(data.map((x) => x.properties.formatted));
      }
    });

    this.address?.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe((text: any) => {
      if (text && text.trim() !== '') {
        //to prevent search when address field is not valid
        this.store.dispatch(userAction.getAddressSuggestions({ payload: text }))
      }
    }
    );
  }

  addUser(): void {
    //when user selected from suggestion list
    //selectedoption should equal to address value
    if (!this.selectedOption || this.selectedOption !== this.address?.value) {
      this.address?.setValue(null);
      this.selectedOption = '';
      this.filteredOptions = of([]);
    }

    //check if a form is valid
    if (this.userForm.valid) {
      //add user into state
      this.store.dispatch(userAction.addUser({ payload: this.userForm.value as User }));
      this.reset();
      this.dialogRef.close();
    }
  }

  reset(): void {
    this.userForm.reset();
    this.selectedOption = '';
    this.filteredOptions = of([]);
  }

  addressClick(event: any): void {
    //for checks: to force user to select an address from the suggestion list
    this.selectedOption = event.option.value;
  }
}
