import { getListName, getCustomData, getDiscount, getPrice } from '@/js/helper/trackingHelpers';

/**
 * Liste des mappings effectués sur les données de produit
 * Nb :
 * Tout champ non listé n'est pas poussé à GTM
 * si la valeur de la propriété est un string, alors on récupéera la propriété produit correspondant à ce string
 * si la valeur de la propriété est une fonction, alors on passera le produit à la fonction et on récupérera la résultat retourné par la fonction
 */
export const itemMapping = {
  index: 'position',
  id: 'id',
  name: 'title',
  quantity: 'quantity',
  variant: 'public_title',
  category: 'item_category',
  sku: 'sku',
  barcode: 'barcode',
  brand: 'vendor',
  item_list_name: ({ list }) => getListName(list),
  price: getPrice,
  discount: getDiscount,
  in_stock: 'available',
  custom: getCustomData,
};
