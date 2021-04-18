import stringifyParams from '../utils/utils';

class HolidayService {
  apiKey: string;
  url: string;
  constructor() {
    this.apiKey = "3550036033338ad059ac93bf4be4cc7c2373fd85";
    this.url = 'https://calendarific.com/api/v2/holidays';
  }

  async getHolidays(country, year) {
    let params = {
        api_key: this.apiKey,
        country,
        year
    };

    const response = await fetch(this.url + stringifyParams(params), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        mode:'cors'
    });
    return response;
  }
}

export default HolidayService;