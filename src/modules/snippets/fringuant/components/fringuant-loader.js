// js/custom-element/section/cart/cart-note.js
import { setCartContent } from '@/js/store/cart';

window.FringuantConfig.afterAddToCart = async function (response) {
  const cartContent = await (
    await fetch(`${window.themeVariables.routes.cartUrl}.js`, {
      cache: 'reload',
    })
  ).json();

  setCartContent(cartContent);
  document.documentElement.dispatchEvent(
    new CustomEvent('cart:updated', {
      bubbles: true,
      detail: {
        cart: cartContent,
      },
    }),
  );

  const addedItem = response.items[0];
  window.fringuantSDK.setButtonSize(addedItem.variant_title);
};
