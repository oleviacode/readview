import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMethod = async () => {
  const token = await AsyncStorage.getItem('token');
  const fullThing = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  return fullThing;
};

export const patchMethod = async () => {
  const token = await AsyncStorage.getItem('token');
  const fullThing = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  return fullThing;
};

export const postMethod = async () => {
  const token = await AsyncStorage.getItem('token');
  const fullThing = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  return fullThing;
};
