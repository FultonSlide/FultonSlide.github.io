class Time {
    constructor(){
        this.timeURI = 'https://worldtimeapi.org/api/timezone/';
    }

    // Gets the local time of the user entered city
    async getTime(data) {
        const query = `${data.TimeZone.Name}`;
        const response = await fetch(this.timeURI + query);
        const result = await response.json();
        const localTime = !result.error ? await result.datetime.slice(11, 16) : 'N/A';

        return localTime;
    }
}