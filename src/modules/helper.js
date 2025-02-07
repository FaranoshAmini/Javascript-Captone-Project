import { TIME_OUT } from './config.js';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// eslint-disable-next-line import/prefer-default-export
export const getJSON = async function (url) {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
