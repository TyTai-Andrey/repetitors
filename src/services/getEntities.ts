import { API_URL } from '../constants/constants';

const getEntities = async (entity: 'subjects' | 'areas') => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/public/${entity}`
    );
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

export default getEntities;
