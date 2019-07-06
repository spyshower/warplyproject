import { ADD_PLACE } from './types';

export const addPlace = placeInfo => {
  return {
    type: ADD_PLACE,
    payload: placeInfo
  }
}
