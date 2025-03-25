import SectionLoader from '@/js/helper/section-loader';
import { subscribeWishlistItems, setWishlistItemsCount } from '@/js/store/wishlist';
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';

class WishlistSelection extends CustomHTMLElement {
  items = [];
  pageSize = 50;
  constructor() {
    super();

    this.desktop_products_per_row = this.getAttribute('desktop-products-per-row') || '4';
    this.mobile_products_per_row = this.getAttribute('mobile-products-per-row') || '2';

    this.emptyTemplate = this.getTemplate('.empty-wishlist');
  }

  connectedCallback() {
    subscribeWishlistItems(this._onWishlistItems.bind(this), true);
    this.rootDelegate.on('pagination:page-changed', this._onPageChanged.bind(this));
  }

  async _onWishlistItems(items) {
    // reset des items
    this.items = items;
    await this.getProducts();
  }

  async _onPageChanged(event) {
    await this.getProducts(event.detail.page);
  }

  async getProducts(page = 1) {
    if (this.items.length) {
      // permet d'utiliser la recherche avec des produits spécifiques
      const query = this.items.map((item) => `handle:${item.split('|')[0]}`).join(' OR ');
      const result = await SectionLoader.load({
        resource: 'search',
        params: {
          q: query,
          page,
          view: new Date().getTime(), // hack pour cramer le cache serveur
          list_id: 'wishlist',
          page_size: this.pageSize,
          desktop_products_per_row: this.desktop_products_per_row,
          mobile_products_per_row: this.mobile_products_per_row,
        },
        sections: 'ajax-search-product-list',
        options: {
          returnNodes: false,
          saveToStorage: false,
          cache: false,
        },
      });

      const fakeDiv = document.createElement('div');
      fakeDiv.innerHTML = result;

      const productList = fakeDiv.querySelector('product-list');
      if (productList && productList.hasAttributes('items-count')) {
        setWishlistItemsCount(parseInt(productList.getAttribute('items-count')));
      }

      // si première page on reset la vue sinon on ajoute les produits
      if (page === 1) {
        this.innerHTML = result;
      } else {
        // ajout des produits en fin de liste
        this.querySelector('.product-list__inner').insertAdjacentHTML(
          'beforeend',
          fakeDiv.querySelector('.product-list__inner').innerHTML,
        );

        // gestion de la pagination
        const newPagination = fakeDiv.querySelector('.pagination');
        if (newPagination) {
          this.querySelector('.pagination').outerHTML = newPagination.outerHTML;
        } else {
          this.querySelector('.pagination').remove();
        }
      }
      return;
    }
    // reset du nombre d'éléments
    setWishlistItemsCount(0);
    this.innerHTML = this.emptyTemplate;
  }
}

customElements.define('wishlist-selection', WishlistSelection);
export default WishlistSelection;
