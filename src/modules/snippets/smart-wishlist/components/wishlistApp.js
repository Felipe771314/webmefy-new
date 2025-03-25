import { subscribeUser } from '@/js/store/user';
import { subscribeWToGranularWishlistChanges } from '@/js/store/wishlist';
import {
  addProductToWishlist,
  clearWishlistCollection,
  mergeWishlist,
  removeProductFromWishlist,
} from '@modules/snippets/smart-wishlist/components/wishlistService';

class WishlistApp extends HTMLElement {
  connectedCallback() {
    subscribeUser(this.whenUser.bind(this), true);
    subscribeWToGranularWishlistChanges(this.whenItems.bind(this), false);
  }

  whenUser(user) {
    this.userId = user.id;
    // Fait un merge lors du login
    if (user.action == 'login' || user.action == 'sign_up') {
      mergeWishlist();
    }
  }

  /**
   * Synchronise les changements avec le serveur
   * @param change
   * @returns {Promise<void>}
   */
  async whenItems(change) {
    // uniquement si le user est logué
    if (!this.userId) return;
    // et s'il y a un changement
    if (!change || !change.type) return;

    switch (change.type) {
      case 'add':
        for (let i = 0; i < change.added_elems.length; i++) {
          await addProductToWishlist(change.added_elems[i]);
        }
        break;
      case 'remove':
        for (let i = 0; i < change.deleted_elems.length; i++) {
          await removeProductFromWishlist(change.deleted_elems[i]);
        }
        break;
      case 'reset':
        await clearWishlistCollection();
    }
  }
}

customElements.define('smart-wishlist', WishlistApp);
export default WishlistApp;
