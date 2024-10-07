import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PetItem } from 'src/app/models/pet-item.model';
import { Pet } from 'src/app/models/pet.model';
import { PetUtil } from 'src/app/utils/pet.utils';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrl: './pets-page.component.css',
})
export class PetsPageComponent implements OnInit {
  addClick = false;
  form!: FormGroup;
  pets: Pet = new Pet();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pets = PetUtil.get();

    this.form = this.fb.group({
      name: [
         '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(4),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(244),
          Validators.minLength(12),
        ]),
      ],
      image: [
        '',
        Validators.required,
      ],
    });
  }

  show() {
    this.addClick = !this.addClick;
  }

  fileChange($event) {
    let file = $event.target.files[0];
    let image64;
    console.log($event.target.files[0].type);

    if (file.type !== 'image/jpeg') {
      this.form.controls['image'].reset();
      return false;
    }

    let reader = new FileReader();

    
    reader.onload = function(event){
      console.log(event)
      image64 = event.target.result
    }
    
    reader.readAsDataURL(file);
    
    this.form.controls['image'].setValue(image64 ? image64 : '');
    // reader.addEventListener('load', () => {
    //   const url = reader.result;

    // });
  }

  addPet() {
    let pet: PetItem = {
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.controls['image'].value,
    };

    console.log(this.form.value);
    this.addClick = false;
    PetUtil.add(pet);

    this.form.reset();
    window.location.reload();
  }

  remove(pet: PetItem) {
    let index = this.pets.petModel.indexOf(pet);
    this.pets.petModel.splice(index, 1);
    PetUtil.update(this.pets);
  }
}
