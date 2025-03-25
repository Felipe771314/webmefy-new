import {
  getListName,
  getCustomData,
  getDiscount,
  getDiscountCode,
  getPrice,
  getPromotionName,
  getMainImage,
  getPriceAti,
} from '@/js/helper/trackingHelpers';

/**
 * Liste des mappings effectués sur les données de produit
 * Nb :
 * Tout champ non listé n'est pas poussé à GTM
 * si la valeur de la propriété est un string, alors on récupéera la propriété produit correspondant à ce string
 * si la valeur de la propriété est une fonction, alors on passera le produit à la fonction et on récupérera la résultat retourné par la fonction
 */
export const itemMapping = {
  index: 'position',
  item_id: 'id',
  item_name: 'title',
  item_list_id: 'list',
  item_variant: 'public_title',
  item_category: 'item_category',
  item_category2: 'item_category2',
  item_category3: 'item_category3',
  item_category4: 'item_category4',
  item_category5: 'item_category5',
  item_sku: 'sku',
  item_barcode: 'barcode',
  variant_infos: 'optionInfos',
  item_image: getMainImage,
  item_url: 'url',
  item_list_name: ({ list }) => getListName(list),
  price: getPrice,
  price_ati: getPriceAti,
  discount: getDiscount,
  in_stock: 'available',
  custom: getCustomData,
};

/**
 * Liste des mappings effectués sur les données de produit
 * Nb :
 * Tout champ non listé n'est pas poussé à GTM
 * si la valeur de la propriété est un string, alors on récupéera la propriété produit correspondant à ce string
 * si la valeur de la propriété est une fonction, alors on passera le produit à la fonction et on récupérera la résultat retourné par la fonction
 */
export const cartMapping = {
  index: 'position',
  item_id: 'id',
  item_name: 'product_title',
  item_list_id: 'list',
  quantity: 'quantity',
  item_variant: 'variant_title',
  item_category: 'item_category',
  item_category2: 'item_category2',
  item_category3: 'item_category3',
  item_category4: 'item_category4',
  item_category5: 'item_category5',
  item_sku: 'sku',
  item_barcode: 'barcode',
  item_list_name: ({ list }) => getListName(list),
  price: getPrice,
  price_ati: getPriceAti,
  discount: getDiscount,
  promotion_name: getPromotionName,
  coupon: getDiscountCode,
};
