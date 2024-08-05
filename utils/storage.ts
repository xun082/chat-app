import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalStorageEnum {
  USER_AUTH = 'USER_AUTH',
}

/**
 * 从 AsyncStorage 获取数据
 * @param {string} key - 要获取数据的键名
 * @param {T} defaultValue - 如果没有找到数据，返回的默认值
 * @returns {Promise<T>} - 返回一个 Promise，解析为获取到的数据或默认值
 */
export const getDataFromAsyncStorage = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value) as T;
    } else {
      return defaultValue;
    }
  } catch (error) {
    console.error(`从 AsyncStorage 获取数据时出错: ${error}`);
    return defaultValue;
  }
};
