import React, {useState} from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/weather', {
      method: 'POST',
      body: JSON.stringify({city}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    const {description, icon} = await response.json();
    setWeather(description);
    setIcon(icon);
  }
  const iconurl = "http://openweathermap.org/img/w/" + icon + ".png"

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Find Weather</button>
    </form>
    {weather && <h3>Current Weather: {weather}</h3>}
    {icon && <img src={iconurl} alt={weather} />}
    </>
  )
}

export default Weather;
