class Holidays {
    constructor(){
        this.apiKey = '03768f52e0e88c022b4f87ab428876ce768c179fc82302b11d8f5aada49785ef';
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.holidaysURI = 'https://calendarific.com/api/v2/holidays?&api_key=';
    }

    // Gets the local holidays the country the city the user entered is in
    async getHolidays(data) {
        const query = `${data.Country.ID}`;
        const response = await fetch(this.holidaysURI + this.apiKey + '&country=' + query + '&year=' + this.year + '&month=' + this.month + '&type=national');
        const result = await response.json();
        const countryHolidays = !result.error ? await result : 'N/A';
        console.log(countryHolidays);
        return countryHolidays;
    }
}