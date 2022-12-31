import { p_20220106, p_20220612, p_2021 } from './constant.js';
/**
 *
 * @returns {string[]}
 */
function loadPhoneNumbers() {
  const phonesRaw = [p_20220106, p_20220612, p_2021]
    .map((str) => str.trim().split('\n'))
    .reduce((result, current) => [...result, ...current], []);
  const phoneNumbers = new Set(phonesRaw);
  console.log('전체', phonesRaw.length);
  console.log('중복제거 후', phoneNumbers.size);

  return Array.from(phoneNumbers).map((n) => '010' + n.replace(/[^0-9]*/g, ''));
}

/**
 *
 * @param {string[]} phoneNumbers
 */
function outputPhoneNumbers(phoneNumbers) {
  console.log(phoneNumbers.join(','));
}

outputPhoneNumbers(loadPhoneNumbers());
