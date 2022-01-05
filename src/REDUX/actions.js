import { PRESET_DISTRICTS, PRESET_SUBJECTS, PRESET_AREAS } from './types';

// Установить район для поиска
export function setDistrict(district) {
  return { type: PRESET_DISTRICTS, payload: district };
}

// Установить предмет для поиска
export function setSubject(subject) {
  return { type: PRESET_SUBJECTS, payload: subject };
}

// Установить город для поиска
export function setArea(area) {
  return { type: PRESET_AREAS, payload: area };
}
