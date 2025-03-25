import map_styles from '@modules/sections/map-place-list/components/map-styles';
import { MarkerClusterer, DefaultRenderer } from '@googlemaps/markerclusterer';
import { Loader } from '@googlemaps/js-api-loader';

import {
  setMap,
  subscribeMap,
  setNearbyPlaces,
} from '@modules/sections/map-place-list/components/map-store';
class MapViewer extends HTMLElement {
  constructor() {
    super();
    this.places = new Map();
    this.markers = [];
  }

  async _loadGoogleMaps() {
    const loader = new Loader({
      apiKey: this.googleApiToken,
      version: this.googleApiVersion,
      region: this.googleApiRegion,
      libraries: this.googleApiLibraries,
    });

    return loader.load().then(() => {
      this.dispatchEvent(
        new CustomEvent('map-place-list:googlemaps-api-loaded', {
          bubbles: true,
          cancelable: true,
          detail: {
            mapId: this.mapId,
            loaded: true,
          },
        }),
      );
    });
  }

  get googleApiToken() {
    return this.getAttribute('google-api-token');
  }

  get googleApiRegion() {
    return this.getAttribute('google-api-region');
  }

  get googleApiVersion() {
    return this.getAttribute('google-api-version') || 'weekly';
  }

  get googleApiLibraries() {
    return (this.getAttribute('google-api-libraries') || 'geometry,places').split(',');
  }

  getClusterImage(size, color) {
    const main_color = `rgba(${color},1)`;
    const light_color = `rgba(${color},0.6)`;
    const light_color2 = `rgba(${color},0.4)`;
    const light_color3 = `rgba(${color},0.2)`;
    const svg = `<svg viewBox="0 0 ${size} ${size} " width="${size}px" height="${size}px" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${light_color3}"/>
              <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2.4}" fill="${light_color2}"/>
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 3}" fill="${light_color}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 3.5}" fill="${main_color}"/>
    </svg>`;
    const encoded = window.btoa(svg);
    return 'data:image/svg+xml;base64,' + encoded;
  }

  grabTemplates() {
    const templates = this.querySelectorAll('template');
    [...templates].forEach((template) => {
      const name = template.getAttribute('name');
      const address = template.getAttribute('address');
      const longitude = template.getAttribute('longitude') || null;
      const latitude = template.getAttribute('latitude') || null;
      const node = template.content.firstElementChild.cloneNode(true);
      const navigateButton = node.querySelector('[navigate-button]');

      this.places.set(name, {
        node,
        navigateButton,
        address,
        longitude,
        latitude,
        name,
      });
    });
  }

  get mapStyleId() {
    return this.getAttribute('map-style-id') || null;
  }
  get mapStyles() {
    const name = this.getAttribute('map-style-name');
    return map_styles[name] || map_styles['DEFAULT'];
  }
  get mapId() {
    return this.getAttribute('map-id');
  }

  get clusterColor() {
    return this.getAttribute('cluster-color') || '128, 128, 128';
  }

  get clusterTextColor() {
    return this.getAttribute('cluster-text-color') || '#ffffff';
  }

  get clusterSize() {
    return parseInt(this.getAttribute('cluster-size') || '45');
  }

  get storeIcon() {
    return this.getAttribute('store-icon') || null;
  }

  get locationIcon() {
    return this.getAttribute('location-icon') || null;
  }

  get searchRadius() {
    return this.getAttribute('search-radius') || 1000;
  }

  async init() {
    await this._loadGoogleMaps();
    this.geocoder = new google.maps.Geocoder();
    this.infowindow = new google.maps.InfoWindow();
    const { Map } = await google.maps.importLibrary('maps');

    this.map = new Map(this, {
      mapId: this.mapStyleId,
      styles: this.mapStyles,
      center: { lat: -34.397, lng: 150.644 },
      //  zoom: 8,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
    });
  }

  async addPlaces(place) {
    let location;

    if (place.latitude !== null && place.longitude !== null) {
      location = new google.maps.LatLng(parseFloat(place.latitude), parseFloat(place.longitude));
    } else {
      const { results } = await this.geocoder.geocode({
        address: place.address,
      });

      const geo = results[0];
      location = geo?.geometry?.location;
    }

    if (!location) return;
    const marker = this.addMarker(location, place);
    this.markers.push(marker);
    this.places.set(place.name, {
      ...place,
      location,
      marker,
    });
  }

  display(place) {
    if (!place) {
      this.infowindow.close(this.map);
    }
    if (place.navigateButton && place.location) {
      /*
      if (window?.matchMedia("(max-width: 1200px)")?.matches) {
        place.navigateButton.href = `geo:${place.location.lat()},${place.location.lng()}`;
      } else {
        place.navigateButton.href = `https://www.google.com/maps/search/?api=1&query=${place.location.lat()},${place.location.lng()}`;
      }
       */
      place.navigateButton.href = `https://www.google.com/maps/search/?api=1&query=${place.location.lat()},${place.location.lng()}`;
    }

    this.infowindow.setContent(`
   ${place.node.outerHTML}
    `);
    this.infowindow.open(this.map, place.marker);
  }

  addMarker(location, place) {
    const marker = new google.maps.Marker({
      position: location,
      icon: this.storeIcon,
    });

    google.maps.event.addListener(marker, 'click', () => {
      setMap(this.mapId, place.name);

      this.display({ ...place, marker });
    });

    return marker;
  }

  putInCluster() {
    const renderer = new DefaultRenderer();
    renderer.render = ({ count, position }, stats) => {
      let size =
        count > Math.max(10, stats.clusters.markers.mean)
          ? Math.round(this.clusterSize * 1.2)
          : this.clusterSize;
      // create marker using svg icon
      return new google.maps.Marker({
        position,
        icon: {
          url: this.getClusterImage(size, this.clusterColor),
          scaledSize: new google.maps.Size(size, size),
        },
        label: {
          text: String(count),
          color: this.clusterTextColor,
          fontSize: '12px',
        },
        // adjust zIndex to be above other markers
        zIndex: 1000 + count,
      });
    };

    new MarkerClusterer({ markers: this.markers, map: this.map, renderer });
  }

  focus() {
    const bounds = new google.maps.LatLngBounds();
    this.places.forEach((place) => {
      bounds.extend(place.location);
    });

    this.map.fitBounds(bounds);
  }

  selectBlock({ currentElement }) {
    const place = this.places.get(currentElement);
    if (place) {
      this.display(place);
    }
    this.map.setZoom(12);
  }

  findClosest(reference_location) {
    const places = [...this.places].map(([key, value]) => value);

    const closestPlaces = places
      .filter((place) => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          reference_location,
          place.marker.position,
        );
        return distance < this.searchRadius;
      })
      .sort((a, b) => {
        const distanceA = google.maps.geometry.spherical.computeDistanceBetween(
          reference_location,
          a.marker.position,
        );
        const distanceB = google.maps.geometry.spherical.computeDistanceBetween(
          reference_location,
          b.marker.position,
        );
        return distanceA - distanceB; // ascending order
      });

    if (closestPlaces.length == 0) {
      setNearbyPlaces(this.mapId, null, null);
      return places[0];
    }
    setNearbyPlaces(
      this.mapId,
      closestPlaces[0].name,
      closestPlaces.map((p) => p.name),
    );
    return closestPlaces[0];
  }

  displaySearch(event) {
    const { mapId, location } = event.detail;
    if (!mapId || !location || mapId !== this.mapId) return;

    const foundPlace = this.findClosest(location);

    // Hack : Laisse le temps au state manager de diffuser l'innfo
    setTimeout(() => {
      if (this.marker) this.marker.setMap(null);

      this.marker = new google.maps.Marker({
        position: location,
        icon: this.locationIcon,
        map: this.map,
      });

      const bounds = new google.maps.LatLngBounds();
      foundPlace && bounds.extend(foundPlace.location);
      bounds.extend(location);
      this.map.fitBounds(bounds);
      //  this.map.setZoom(9);
    }, 100);
  }

  async connectedCallback() {
    this.grabTemplates();
    this._unsubscribeMap = subscribeMap(this.mapId, this.selectBlock.bind(this), true);
    this.displaySearch = this.displaySearch.bind(this);

    document.addEventListener('map-place-list:search', this.displaySearch);

    await this.init();

    for (const place of this.places) {
      await this.addPlaces(place[1]);
    }
    this.focus();
    this.putInCluster();
  }

  disconnectedCallback() {
    this._unsubscribeMap();
    document.removeEventListener('map-place-list:search', this.displaySearch);
  }
}

customElements.define('map-viewer', MapViewer);
export default MapViewer;
