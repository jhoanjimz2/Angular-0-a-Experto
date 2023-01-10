import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [ number, number ]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number,number] = [ -74.1749176, 11.2222778 ];

  // Arreglo de marcadores
  marcadores: MarcadorColor [] = [];

  constructor() { }
  
  ngAfterViewInit() {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
      maxZoom: 18
    });

    this.leerLocalStorage();

    /* const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola mundo';

    new mapboxgl.Marker()
      .setLngLat( this.center )
      .addTo(this.mapa) */

    }
  agregarMarcador() {

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random()*16|0).toString(16) );

    const nuevoMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo(this.mapa);

    this.marcadores.push( { color, marker: nuevoMarker} );

    this.guardarMarcadoresLocalStorage();

    nuevoMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })

  }
  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo( { center: marcador.getLngLat() } )
  }
  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({ color , centro: [ lng, lat ] })
    });

    localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr) )
    
  }
  leerLocalStorage() {

    if (!localStorage.getItem('marcadores')) return;

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem( 'marcadores' )!);

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat( m.centro! ).addTo( this.mapa );

      this.marcadores.push( { color: m.color, marker: newMarker} );

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })

    });

  }

  borrarMarcador( i: number ) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage();
  }



}
