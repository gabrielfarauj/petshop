import { PetItem } from '../models/pet-item.model';
import { Pet } from '../models/pet.model';

export class PetUtil {
  public static add(pet: PetItem) {
    let pets = this.get();
    pets.petModel.push(pet);
    console.log(pets);
    localStorage.setItem('petshoppet', JSON.stringify(pets));
  }

  public static get() {
    let pets = localStorage.getItem('petshoppet');

    if (pets) {
      return JSON.parse(pets);
    } else {
      return new Pet();
    }
  }

  public static update(pets: Pet) {
    localStorage.setItem('petshoppet', JSON.stringify(pets));
  }

  public static clear(){
    localStorage.clear();
  }
}
