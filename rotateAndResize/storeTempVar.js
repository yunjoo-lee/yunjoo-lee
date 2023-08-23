/**
 * save 기능만을 하는 함수 구현
 * @returns 필요한 함수
 */
const createStore = () => {
  const data = {};

  /**
   * Store a value by key.
   * @param {string} key - The key under which the value should be stored.
   * @param {*} value - The value to be stored.
   */
  const storeValue = (key, value) => {
    data[key] = value;
  };

  /**
   * Retrieve a value by key.
   * @param {string} key - The key of the value to be retrieved.
   * @return {*} The value associated with the key or undefined if not found.
   */
  const getValue = (key) => {
    return data[key];
  };

  /**
   * Retrieve all stored data.
   * @return {object} The entire storage object.
   */
  const getAllValues = () => {
    return data;
  };

  return {
    storeValue,
    getValue,
    getAllValues,
  };
};

var storage = createStore();

// /////////////////////////////////////////////////////////////

// // 사용 예제
// storage.storeValue("username", "Alice");
// console.log(storage.getValue("username")); // Alice
// console.log(storage.getAllValues()); // { username: "Alice" }
