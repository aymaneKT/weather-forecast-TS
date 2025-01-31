import { useEffect, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, TextField } from "@mui/material";
import picture from "./picture.png";
import { useTranslation } from "react-i18next";

type Weather = {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  description: string;
  icon: string;
};

type infoCity = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  cityInArabic?: string;
};

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [Temp, setTemp] = useState<Weather>({} as Weather);
  const [dateAndHour, setDateAndHour] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [suggestedCity, setSuggestedInfoCity] = useState<Array<infoCity>>([]);
  const [Lang, setLang] = useState<string>("en");
  const [citySelected, setCitySelected] = useState<infoCity>({
    city: "Casablanca",
    country: "Morocco",
    lat: 33.589886,
    lon: -7.603869,
    cityInArabic: "الدار البيضاء",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const fetchWeather = (citySelected: infoCity) => {
    setIsLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${citySelected.lat}&lon=${citySelected.lon}&appid=${WEATHER_API_KEY}`
      )
      .then((res) => {
        setTemp({
          temperature: Math.round(res.data.main.temp - 273.15),
          minTemperature: Math.round(res.data.main.temp_min - 273.15),
          maxTemperature: Math.round(res.data.main.temp_max - 273.15),
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const translateFunction = () => {
    if (Lang === "ar") {
      i18n.changeLanguage("en");

      setLang("en");
    } else {
      i18n.changeLanguage("ar");

      setLang("ar");
    }
  };

  // Effettua la chiamata ogni volta che cambia citySelected
  useEffect(() => {
    fetchWeather(citySelected);
  }, [citySelected]);

  // Chiamata per la città di default (Casablanca) quando il componente viene caricato per la prima volta
  useEffect(() => {
    fetchWeather(citySelected); // Chiamata per Casablanca di default
  }, []);

  // Aggiorna la data e l'ora ogni secondo
  useEffect(() => {
    let interval = setInterval(() => {
      setDateAndHour(new Date().toLocaleString(Lang));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [Lang]);

  // Effettua la chiamata per ottenere le città suggerite ogni volta che cambia l'input city
  useEffect(() => {
    if (city.trim() === "") return;
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=${WEATHER_API_KEY}`
      )
      .then((response) => {
        const suggestedCityResponse = response.data.map((element: any) => ({
          city: element.name,
          country: element.country,
          lat: element.lat,
          lon: element.lon,
          cityInArabic:
            element.local_names?.ar && element.local_names.ar !== ""
              ? element.local_names.ar
              : element.name,
        }));
        setSuggestedInfoCity(suggestedCityResponse);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);

  return (
    <div className="h-screen bg-blue-500">
      <header className="flex items-center justify-center p-4">
        <h1 className="text-3xl text-white font-black">Aymane Kabti</h1>
        <img
          src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
          alt="weather"
          className="w-[75px] h-[100px]"
        />
      </header>
      <main>
        <Button
          style={{
            color: "#2B7FFF",
            background: "white",
            position: "relative",
            left: "50%",
            transform: "translate(-50% , 0)",
            margin: "20px 0",
          }}
          variant="outlined"
          onClick={translateFunction}
        >
          {Lang == "ar" ? "انجليزي" : "Arabic"}
        </Button>
        <Container maxWidth="sm" className="bg-[#0A3F9D] rounded-md opacity-90">
          <div
            style={{
              direction: Lang == "ar" ? "rtl" : "ltr",
            }}
            className="flex items-end gap-10 text-white p-3"
          >
            <h1 className="text-3xl font-bold ">
              {Lang == "en" ? citySelected.city : citySelected.cityInArabic}
            </h1>

            <p>{dateAndHour}</p>
          </div>
          <hr className="text-white" />
          <div className="flex items-center justify-between p-9 text-white font-bold">
            <img className="w-[150px] h-[150px]" src={picture} />
            {isLoading ? (
              <span className="text-[12px]">
                LOOKING OUTSIDE FOR YOU... ONE SEC
              </span>
            ) : (
              <div
                style={{
                  textAlign: Lang == "ar" ? "right" : "left",
                }}
                className=" flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-[100px] h-[100px]"
                    src={` https://openweathermap.org/img/wn/${Temp.icon}@2x.png`}
                  />
                  <h3 className="text-2xl">{Temp.temperature}°C</h3>
                </div>
                <h2>{t(Temp.description)}</h2>
                <h3 className="flex">
                  <span>
                    {t("max")}:{Temp.maxTemperature} °C
                  </span>
                  <span>
                    {t("min")}:{Temp.minTemperature} °C
                  </span>
                </h3>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Autocomplete
        className="bg-white p-1 rounded-md w-[200px] m-auto border-0 outline-0 mt-5"
        disablePortal
        options={suggestedCity.map(
          (option) => option.city + " - " + option.country
        )}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="City" />}
        inputValue={city}
        onInputChange={(_, newInputValue) => {
          setCity(newInputValue);
        }}
        onChange={(_, newValue) => {
          setCity(newValue || "");
          const selected = suggestedCity.find(
            (c) => c.city === newValue?.split(" - ")[0]
          );

          selected ? setCitySelected(selected) : null;
        }}
      />
    </div>
  );
}

export default App;
