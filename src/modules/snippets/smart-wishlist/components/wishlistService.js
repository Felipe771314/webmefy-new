import {
  getWishlistItems,
  setWishListId,
  getWishListId,
  addWishlistPair,
  cleanWishlistItems,
} from '@/js/store/wishlist';
import { fetchJsonp } from '@/js/helper/fetchJsonp';
import { getUser } from '@/js/store/user';
import SectionLoader from '@/js/helper/section-loader';

const ADD_PRODUCT_URL = 'https://cloud.smartwishlist.webmarked.net/v6/savewishlist.php/';
const GET_WISHLIST_URL = 'https://front.smartwishlist.webmarked.net/v6/fetchstoredata.php/';
const CLEAR_WISHLIST_URL = 'https://cloud.smartwishlist.webmarked.net/v6/clearwishlist.php/';

const _concatenate = (handle, variantId) => {
  if (!variantId || variantId === 'null' || variantId === 'undefined') return handle;
  return `${handle}|${variantId}`;
};

const generateWishlistId = () => {
  return Math.random().toString(36).slice(2, 22) + Math.random().toString().slice(2, 22);
};

const getId = () => {
  let id = getWishListId();
  if (id) return id;
  id = generateWishlistId();
  setWishListId(id);
  return id;
};

const getSiteVariables = () => ({
  hostname: document.location.hostname,
  store_id: window.__st && window.__st.a,
  customer_id: getUser().id,
  wishlist_id: getId(),
});

export const addProductToWishlist = async (pair) => {
  if (!pair) return;
  const [handle, variant_id] = pair.split(/\|/);
  const params = {
    product_id: handle,
    variant_id,
    variant: 0,
    action: 'add',
    ...getSiteVariables(),
  };

  return await fetchJsonp(ADD_PRODUCT_URL, params);
};

export const removeProductFromWishlist = async (pair) => {
  if (!pair) return;
  const [handle, variant_id] = pair.split(/\|/);
  const params = {
    product_id: handle,
    variant_id,
    variant: 0,
    action: 'remove',
    ...getSiteVariables(),
  };

  return await fetchJsonp(ADD_PRODUCT_URL, params);
};

export const getWishlistCollection = async () => {
  const { customer_id, hostname: store_domain, store_id } = getSiteVariables();
  const params = {
    customer_id,
    store_domain,
    store_id,
  };

  const data = await fetchJsonp(GET_WISHLIST_URL, params);
  return data.wishlist_items || [];
};

export const clearWishlistCollection = async () => {
  await fetchJsonp(CLEAR_WISHLIST_URL, getSiteVariables());
};

export const convertIdToHandles = async (productIds) => {
  const jsonProducts = await SectionLoader.load({
    resource: ``,
    sections: 'ajax-handles-from-product_ids',
    params: {
      product_ids: productIds.join(','),
    },
    options: {
      returnNodes: false,
      removeSectionWrapper: true,
      cache: false,
      saveToStorage: false,
    },
  });

  const { items } = JSON.parse(jsonProducts);
  return items;
};

export const mergeWishlist = async () => {
  const localWishlist = [...getWishlistItems()];
  const serverWishlist = await getWishlistCollection();

  const serverFormattedList = cleanWishlistItems(
    serverWishlist
      .filter((pdt) => /\D/.test(pdt[0])) // Ignore elements coming from old integrations
      .map(([handle, variant_id]) => _concatenate(handle, variant_id)),
  );

  // immediately add unknown products coming from server to statemanager
  serverFormattedList.forEach((elem) => {
    if (localWishlist.includes(elem)) return;
    console.log('Smart-wishlist : Adding from server', elem);
    addWishlistPair(elem);
  });

  // --> Handling  backward compatibility with native smart-wishlist system based on product ids
  // Get orphean list
  const orpheanList = serverWishlist.filter((pdt) => !/\D/.test(pdt[0]));
  const productIds = orpheanList.map((pdt) => pdt[0]);
  if (productIds.length) {
    // Get handle from ids (long and ugly)
    const matchedItems = await convertIdToHandles(productIds);

    const cleanServerList = orpheanList.map(([id, variant_id]) => ({
      toRemove: _concatenate(id, variant_id),
      toAdd: matchedItems[id] ? _concatenate(matchedItems[id], variant_id) : null,
    }));

    for (let i = 0; i < cleanServerList.length; i++) {
      const item = cleanServerList[i];
      console.log('Smart-wishlist : Replacing obsolete item', item.toRemove);
      if (item.toAdd && !localWishlist.includes(item.toAdd)) {
        // Ad new
        addWishlistPair(item.toAdd);
        await addProductToWishlist(item.toAdd);
      }
      // remove old
      await removeProductFromWishlist(item.toRemove);
    }
  }

  // Adding products from localstorage to serveur if needed
  for (let i = 0; i < localWishlist.length; i++) {
    const item = localWishlist[i];
    if (serverFormattedList.includes(item)) continue;

    console.log('Smart-wishlist : Adding item to server', item);
    await addProductToWishlist(item);
  }
};
