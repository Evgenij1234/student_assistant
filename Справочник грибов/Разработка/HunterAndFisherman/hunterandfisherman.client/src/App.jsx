import { useEffect, useState } from 'react';
import './App.css';
import Content from "./Content";

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading...</em></p>
        : 
        <div>
            <Content></Content>
        </div>;

    return (
        <div>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;