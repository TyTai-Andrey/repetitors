import { API_URL } from '../constants/constants';

const getTeacherIds = async (URL: string | number) => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/public/search/teacherIds?${URL}`
    );
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

export default getTeacherIds;
