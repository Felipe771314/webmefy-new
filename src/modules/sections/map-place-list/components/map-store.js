import { proxy, snapshot, subscribe } from 'valtio/vanilla';
import { devtools, subscribeKey } from 'valtio/utils';
import { getUser } from '@/js/store/user';

const state = proxy({
  maps: {},
});

export const getMaps = () => snapshot(state.maps);
export const getMap = (mapId) => snapshot(state.maps[mapId]);

export const subscribeMap = (mapId, callback, triggerFirst = true) => {
  if (triggerFirst && state.maps[mapId]) {
    callback(getMap(mapId));
  }

  return subscribeKey(state.maps, mapId, () => {
    callback(getMap(mapId));
  });
};

export const setMap = (mapId, currentElement) => {
  state.maps[mapId] = {
    ...state.maps[mapId],
    currentElement,
  };

  return state.maps[mapId];
};

export const setNearbyPlaces = (mapId, currentElement, nearbyPlaces) => {
  state.maps[mapId] = {
    ...state.maps[mapId],
    currentElement,
    nearbyPlaces,
  };

  return state.maps[mapId];
};

// ONLY in dev : add debug with redux dev tools and expose some methods
if (import.meta.env.DEV) {
  const unsub = devtools(state, { name: 'oz-maps', enabled: true });
}
