import stringifyParams from '../utils/utils';

class HolidayService {
  apiKey: string;
  url: string;
  constructor() {
    this.apiKey = "70f9882538c8828032b1272cdc85f0e11c0c4e26";
    this.url = 'https://calendarific.com/api/v2/holidays';
  }

  async getHolidays(country, year) {
    let params = {
        api_key: this.apiKey,
        country,
        year
    };

    return await fetch(this.url + stringifyParams(params), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
  }
}

export default HolidayService;