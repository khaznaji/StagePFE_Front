import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'filter'
})
export class FilterPipe implements PipeTransform {

 transform(candidats: any[], etat: string): any[] {
    return candidats.filter(candidat => candidat.etat === etat);
 }

}
