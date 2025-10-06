/*
This is the file where we will define the types we are to expect.
-We are creating the interfaces based on the data we are to receive from our
API
-We will need to define the main interface and the type for the weather icons
*/
export type weatherIcon = 
    'rain' | 'cloudy' | 'clearSkies' | 'snow' | 'thunderstorm' | 'lightShowers' | 'atmosphere'

export interface weatherData{
    temperature: number;
    windSpeed : number;
    humidity: number;
    icon: weatherIcon
}
/*
Define our mapping function, what do we need?
input: id fetched from the API.
output: weatherIcon type.

*/
export function iconMapping(id: number): weatherIcon {
    if(id <=232) return 'thunderstorm';
    if(id >=300 && id <=321) return 'lightShowers';
    if(id >=500 && id <=531 ) return 'rain';
    if(id >=600 && id <= 622) return 'snow';
    if(id >=701 && id <=781) return 'atmosphere';
    if(id === 800) return 'clearSkies';
    if(id >=801 && id <=804) return 'cloudy';
    return 'clearSkies';
    //this is our fallback incase our API returns a number outside the ranges.
}