import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetItem } from 'src/app/models/pet-item.model';
import { Pet } from 'src/app/models/pet.model';
import { PetUtil } from 'src/app/utils/pet.utils';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrl: './pets-page.component.css',
})
export class PetsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('toggleMenu') toggleMenu: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  addClick = false;
  form!: FormGroup;
  pets: Pet = new Pet();

  constructor(private fb: FormBuilder, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Essa parte é dedicada a fechar a tela que aparece quando o click for fora dela!
    // Renderer esta detectando quando o click é em algum lugar da tela e pegando o local do click com o evento
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * E então eu estou comparando o local do click (e) com o elemento responsavel pela tela e como os filho dela e o com o local do botão, e se o
       * click for fora desta área, eu vou fechar a tela que esta aparecendo no momento.
       */
      if (
        e.target !== this.toggleMenu.nativeElement &&
        e.target !== this.menu.nativeElement &&
        !this.menu.nativeElement.contains(e.target)
      ) {
        this.addClick = false;
      }
    });
  }

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
      image: ['', Validators.required],
    });
  }

  show() {
    this.addClick = !this.addClick;
  }

  fileChange($event) {
    let file: File = $event.target.files[0];
    let reader = new FileReader();
    console.log(file);

    // Eu so aceitarei imagem se ela for do tipo JPEG
    if (file.type !== 'image/jpeg') {
      this.form.controls['image'].reset();
      return false;
    }

    reader.readAsDataURL(file);
    reader.onload = () => {
      const image64 = reader.result;
      this.form.patchValue({image: image64})
    };


    // this.form.controls['image'].setValue(file);
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
