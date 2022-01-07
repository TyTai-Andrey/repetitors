import { API_URL } from '../constants/constants';

const getDistricts = async (areaId: string | number) => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/public/districts?areaId=${areaId}`
    );
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

export default getDistricts;
