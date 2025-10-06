**A guide on how we will type our weather app.**

**Modelling the external data.
-Look at the JSON response from my chosen API, and find a sample response in their documentation.
-Create TS interfaces to mirror the structure.
-Identify the data that needs to be typed; temperature, wind speed, humidity, and the weather id.
-The weather id is a bit different though, we need a union type for all my icons. Why? We are going to create a mapping system between the API's id number and the icons we have locally.
-We wil need a function that takes the API's id and will return our weatherIcon type, it will look something like:
    input: number, the weather id from the API.
    output: weatherIconType
-The function will contain the logic: 
    'if (id>=200 && id< 300) return thunderstorm'
-My main interface should use this type we have created.
-This will be inside our types folder, remember things that are closely related and used together should live together.

**Modelling the app's internal state.
-Pattern:
    '
    const [thing, setThing] = useState<WhatCanThisStateBe>(initialValue);
    '
All we are asking is: "What are all the possible shapes our state can take."
-When creating state:
1.What's the initial value? that is a possible type.
2.What will it become later? add that type with a union.
3.Can it be empty/undefined? add null or undefined.
Examples:
const [location, setLocation] = useState<string |null>(null)
const [temperature, setTemperature] = useState<number>(0)
const [search, setSearch] = useState<string>("");
-Whenever our initial value is not available yet, set it to null.

**Universal Hook Typing Principle.
-Every hook follows the same idea: "What are all the possible types this hook can contain or return?"
-The only difference is what the hook actually does;
useState - what can this value be?
useRef - what can this ref point to? (DOM element or mutable value)
//mutable value here means using it like an instance variable, data persisting it across renders and on changing it, will not trigger a re-render.
useContext - what shape does the context provide?
useReducer - what actions and state shapes are possible?

**The 'Async' data rule.
-Always include 'null / undefined' for any state involving:
    1.API calls.
    2.User permissions.
    3.Geolocation.
    4.File loading.
    5.Anything that takes time to resolve.

**Typing our functions.
1.Asynchronous functions:
    '
    const asyncFunction = async(params: ParamTypes) : Promise<ReturnType> => {
        //async work
        return data;
        //this must match our return type.
    }
    '
2.Event handler patterns:
    '
    const handlerName = (event.SpecificEventType):void => {
        //logic goes here
    }
    '

**Typing my components.
-This is mostly done for props.
-As ours is a single-component app, we won't be using this.


**Actionable steps for typing**
Choose your weather API. Read its documentation thoroughly.

Open your code editor and create a new file, e.g., types.ts. This is where you will define all your core types.

Start drafting your interfaces. Begin with the smallest pieces (Coordinates, Wind) and build up to the larger ones (CurrentWeather, ForecastData).

Define your application state type (WeatherState discriminated union).

Now, write a stub for your main fetch function. Just define its input and output types. You can fill the logic later.

As you build your UI components, type their props first, before you write any JSX.


We have our async function and our state, state is for updatng our data, our async function is for fetching the data. Now let's connect the dots.

**What is the flow of our app?
button clicks,calls updateWeatherInfo, update our Ui using our state by taking the returned data and return the state, component re-renders with new data.
