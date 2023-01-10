import { Component } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  selectedId: string = '';

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService
  ) { }

  get isLoadingPlaces(): boolean {
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesServices.places;
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo([ lng, lat ]);
  }

  getDirections( place: Feature ) {
    if ( !this.placesServices.userLocation ) throw Error('No hay userLocation')

    this.placesServices.deletePlaces();

    const start = this.placesServices.userLocation!;
    const end = place.center as [ number, number ];


    this.mapService.getRouteBetweenPoints(start, end);
  }

}
