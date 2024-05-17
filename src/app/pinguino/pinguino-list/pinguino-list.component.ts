import { Component, OnInit } from '@angular/core';
import { Pinguino } from '../pinguino';
import { PinguinoService } from '../pinguino.service';

@Component({
 selector: 'app-pinguino-list',
 templateUrl: './pinguino-list.component.html',
 styleUrls: ['./pinguino-list.component.css']
})
export class PinguinoListComponent implements OnInit {

 pinguinos: Array<Pinguino> = [];

 topDistribution: string = "";
 places: string = "";
 selectedPinguino!: Pinguino;
 selected = false;


 constructor(private pinguinoService: PinguinoService) { }

 getPinguinos(): void {
   this.pinguinoService.getPinguinos().subscribe((pinguinos) => {
     this.pinguinos = pinguinos;
     this.getTopDistribution();
   });
 }

 getTopDistribution(){
  let topName: string = this.pinguinos[0].name;
  let places = this.pinguinos[0].global_distribution;
  let total_places = this.pinguinos[0].global_distribution.split(', ').length
  let aux: number = 0
  for (let i=0; i <this.pinguinos.length;i++){
    aux = this.pinguinos[i].global_distribution.split(', ').length;
    if (aux > total_places){
      total_places = aux;
      topName = this.pinguinos[i].name;
      places = this.pinguinos[i].global_distribution;
    }
  }
  this.topDistribution = topName;
  this.places = places;
}

 OnSelected(pinguino: Pinguino): void{
  this.selected = true;
  this.selectedPinguino = pinguino;
 }

 ngOnInit() {
   this.getPinguinos();
 }

}

