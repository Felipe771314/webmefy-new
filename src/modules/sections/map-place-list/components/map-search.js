import { setNearbyPlaces } from '@modules/sections/map-place-list/components/map-store';
class MapSearch extends HTMLElement {
  get mapId() {
    return this.getAttribute('map-id');
  }
  connectedCallback() {
    this._init = this._init.bind(this);
    if (window.google?.maps) {
      this._init();
    } else {
      document.addEventListener('map-place-list:googlemaps-api-loaded', this._init);
    }
  }

  _init(event) {
    if (event && (event?.detail?.mapId !== this.mapId || event?.detail?.loaded !== true)) {
      return;
    }

    this.geocoder = new google.maps.Geocoder();
    this.input = this.querySelector('input');
    this.buttonLocalize = this.querySelector('.map-place-list__search-geolocation-button');
    this.buttonValid = this.querySelector('.input-autocomplete__submit');
    this.buttonClear = this.querySelector('.input-autocomplete__clear');

    const template = this.querySelector("template[name='error-message']");
    this.errorMessage = template.content.firstElementChild.cloneNode(true).outerHTML;

    const templateLocalization = this.querySelector("template[name='error-message-localization']");
    this.errorMessageLocalization =
      templateLocalization.content.firstElementChild.cloneNode(true).outerHTML;
    this.search = this.search.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.displayLocalizationError = this.displayLocalizationError.bind(this);
    this.localize = this.localize.bind(this);
    this.searchEnter = (event) => {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        this.search();
      }
    };
    this.buttonValid.addEventListener('click', this.search);
    this.buttonClear.addEventListener('click', this.clearValue);
    this.buttonLocalize.addEventListener('click', this.localize);
    this.input.addEventListener('keypress', this.searchEnter);

    const autocomplete = new google.maps.places.Autocomplete(this.input, {
      types: ['geocode', 'establishment'],
    });
    google.maps.event.addListener(autocomplete, 'place_changed', this.search);
  }

  disconnectedCallback() {
    this.buttonValid.removeEventListener('click', this.search);
    this.buttonLocalize.removeEventListener('click', this.localize);
    this.input.removeEventListener('keypress', this.searchEnter);
    document.removeEventListener('map-place-list:googlemaps-api-loaded', this._init);
  }

  localize() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const location = new google.maps.LatLng(latitude, longitude);
        this.dispatchEvent(
          new CustomEvent('map-place-list:search', {
            bubbles: true,
            cancelable: true,
            detail: {
              mapId: this.mapId,
              location,
            },
          }),
        );
      }, this.displayLocalizationError);
    } else {
      this.displayLocalizationError();
    }
  }

  displayLocalizationError() {
    this.dispatchEvent(
      new CustomEvent('simple-notification:show', {
        bubbles: true,
        cancelable: true,
        detail: {
          status: 'error',
          message: this.errorMessageLocalization,
        },
      }),
    );
  }

  clearValue() {
    this.input.value = '';
    setNearbyPlaces(this.mapId, null, null);
  }

  async search() {
    if (!this.input.value) return;
    let error = false;
    let result;
    try {
      const { results } = await this.geocoder.geocode({
        address: this.input.value,
      });
      result = results;
    } catch (e) {
      error = true;
    }

    if (error || !result || !result.length) {
      this.dispatchEvent(
        new CustomEvent('simple-notification:show', {
          bubbles: true,
          cancelable: true,
          detail: {
            status: 'error',
            message: this.errorMessage,
          },
        }),
      );
      return;
    }

    if (result[0]) {
      const location = result[0].geometry.location;

      this.dispatchEvent(
        new CustomEvent('map-place-list:search', {
          bubbles: true,
          cancelable: true,
          detail: {
            mapId: this.mapId,
            location,
          },
        }),
      );
    }
  }
}

customElements.define('map-search', MapSearch);
export default MapSearch;
