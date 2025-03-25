import customHtmlElement from '@/js/custom-element/common/custom-html-element';
import { getParentTarget } from '@/js/helper/get-parent-target';
import { setMap, subscribeMap } from '@modules/sections/map-place-list/components/map-store';

class MapController extends customHtmlElement {
  constructor() {
    super();
    this.places = new Map();
  }
  connectedCallback() {
    this.allElems = [...this.querySelectorAll('[map-target]')];
    this.allElems.forEach((placeListEntry) => {
      if (placeListEntry.getAttribute('map-target')) {
        this.places.set(placeListEntry.getAttribute('map-target'), placeListEntry);
      }
    });
    this.delegate.on('click', '[map-target]', this.showInMap.bind(this));
    this._unsubscribeMap = subscribeMap(this.mapId, this.renderPlaces.bind(this), true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeMap();
  }

  get mapId() {
    return this.getAttribute('map-id');
  }

  renderPlaces({ currentElement, nearbyPlaces }) {
    const currentElems = [...this.querySelectorAll('[map-target]')];
    // sort and hide - happens on search events
    if (nearbyPlaces && nearbyPlaces.length > 0) {
      // check if sorted order has not changed
      const currentNearbyElems = currentElems.filter(
        (place) => !place.classList.contains('hidden'),
      );
      let isPreviousOrder = true;
      for (let i = 0; i < nearbyPlaces.length; i++) {
        const placeListEntry = this.places.get(nearbyPlaces[i]);
        if (placeListEntry !== currentNearbyElems[i]) {
          isPreviousOrder = false;
          break;
        }
      }
      if (!isPreviousOrder) {
        // hide all
        for (let i = 0; i < this.allElems.length; i++) {
          this.allElems[i].classList.add('hidden');
        }
        // show nearest elements
        for (let i = 0; i < nearbyPlaces.length; i++) {
          const placeListEntry = this.places.get(nearbyPlaces[i]);
          placeListEntry.classList.remove('hidden');
          this.appendChild(placeListEntry);
        }
      }
    } else {
      // check the default order
      let isDefaultOrder = true;
      for (let i = 0; i < currentElems.length; i++) {
        if (currentElems[i] !== this.allElems[i]) {
          isDefaultOrder = false;
          break;
        }
      }
      // if order is different reset to default
      if (!isDefaultOrder) {
        for (let i = 0; i < this.allElems.length; i++) {
          this.appendChild(this.allElems[i]);
          this.allElems[i].classList.remove('hidden');
        }
      }
    }

    // select active place
    if (currentElement) this.selectBlock({ currentElement });
  }

  selectBlock({ currentElement }) {
    if (!currentElement) {
      return;
    }
    this.allElems.forEach((elem) => elem.removeAttribute('selected'));
    const selected = this.querySelector(`[map-target="${currentElement}"]`);
    selected.setAttribute('selected', true);
    selected.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }

  showInMap(event) {
    const target = getParentTarget(event.target, '[map-target]');
    const targetId = target.getAttribute('map-target');
    setMap(this.mapId, targetId);
  }
}

customElements.define('map-controller', MapController);
export default MapController;
