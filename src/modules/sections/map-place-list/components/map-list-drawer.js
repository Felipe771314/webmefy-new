import { subscribeMap } from '@modules/sections/map-place-list/components/map-store';
import DrawerContent from '@/js/custom-element/ui/drawer';

class MapListDrawer extends DrawerContent {
  connectedCallback() {
    super.connectedCallback();
    this.selectItemOnMap = this.selectItemOnMap.bind(this);
    this._unsubscribeMap = subscribeMap(this.mapId, this.selectItemOnMap);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeMap();
  }

  get mapId() {
    return this.getAttribute('map-id');
  }

  selectItemOnMap() {
    this.open = false;
  }
}

customElements.define('map-list-drawer', MapListDrawer);
export default MapListDrawer;
