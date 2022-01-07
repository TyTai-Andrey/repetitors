import { API_URL } from '../constants/constants';

const getCardTeachers = async (PATH_repetitorsID: string[]) => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/public/teachers/short?${PATH_repetitorsID.join(
        '&'
      )}`
    );
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

export default getCardTeachers;
