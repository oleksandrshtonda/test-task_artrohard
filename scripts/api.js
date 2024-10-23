/**
 * @typedef {Object} Good
 * @property {number} id
 * @property {string} text
 */

export class API {
  /**
   * @param pageNumber {number} - The number of page with data.
   * @param pageSize {number} - The number that sets quantity of goods per one page.
   * @return {Promise<Good[]>} - array with goods or empty array.
   */
  static async getGoods(pageNumber, pageSize) {
    const url = this.__getApiUrl(pageNumber, pageSize);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return [];
      }

      const data = await response.json();

      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * @param pageNumber {number} - The number of page with data.
   * @param pageSize {number} - The number that sets quantity of goods per one page.
   * @returns {string} - API url to get data.
   */
  static __getApiUrl(pageNumber, pageSize) {
    const API_URL = 'https://brandstestowy.smallhost.pl/api/random?';
    const pageNumberString = pageNumber ? `pageNumber=${pageNumber}` : '';
    const pageSizeString = pageSize ? `&pageSize=${pageSize}` : '';

    return API_URL + pageNumberString + pageSizeString;
  }
}
