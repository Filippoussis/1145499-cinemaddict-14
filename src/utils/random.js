/**
 * генерирует случайное целое число из диапазона от min до max (включительно)
 * @param {number} min - наименьшее число из диапазона
 * @param {number} max - наибольшее число из диапазона
 * @return {number} случайное целое число из диапазона
 */
export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max - min + 1));


/**
 * генерирует случайное число с плавающей точкой из диапазона от min до max (включительно)
 * @param {number} min - наименьшее число из диапазона
 * @param {number} max - наибольшее число из диапазона
 * @param {number} n - количество знаков после точки
 * @return {string} случайное число с плавающей точкой из диапазона в строковом представлении
 */
export const getRandomFloat = (min = 0, max = 1, n = 1) => (min + Math.random() * (max - min)).toFixed(n);

/**
 * возвращает случайный элемент массива
 * @param {Array} arr - массив данных
 * @return {string} случайный элемент массива
 */
export const getRandomElementFromArray = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

/**
 * возвращает массив случайной длины из неповторяющихся элементов
 * @param {Array} arr - массив данных
 * @param {number} min - минимально возможное количество элементов в новом массиве
 * @param {number} max - максимально возможное количество элементов в новом массиве
 * @return {Array} массив случайной длины
 */
export const getArrayRandomLength = (arr, min, max) => {
  const arrCopy = arr.slice();
  return arrCopy.splice(getRandomInteger(0, arrCopy.length - 1), getRandomInteger(min, max));
};

/**
 * генерирует случайную дату из заданного интервала лет и возвращает встроенный объект Date
 * @param {number} minYear - минимальное целое значение года в формате 'YYYY'
 * @param {number} maxYear - минимальное целое значение года в формате 'YYYY'
 * @param {number} minMonth - минимальное целое значение месяца (по умолчанию 0 - январь)
 * @param {number} maxMonth - минимальное целое значение месяца (по умолчанию 11 - декабрь)
 * @param {number} minDay - минимальное значение дня месяца (по умолчанию 1)
 * @param {number} maxDay - максимальное значение дня месяца (по умолчанию 31)
 * @return {Date} объект даты
 */
export const getRandomDate = (minYear, maxYear, minMonth = 0, maxMonth = 11, minDay = 1, maxDay = 31) => {
  const randomYear = getRandomInteger(minYear, maxYear);
  const randomMonth = getRandomInteger(minMonth, maxMonth);
  const randomDay = getRandomInteger(minDay, maxDay);
  return new Date(randomYear, randomMonth, randomDay);
};
