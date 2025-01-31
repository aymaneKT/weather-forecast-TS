# Weather App

## Description

This React application allows users to view weather information for a selected city. It uses the OpenWeather API to fetch real-time weather data and supports language translation (English and Arabic).

## Technologies Used

- **React**: JavaScript framework for building the user interface.
- **Material-UI (MUI)**: UI component library for React.
- **Axios**: Library for making HTTP requests.
- **i18next**: Library for managing translations.
- **OpenWeather API**: Service to obtain weather data.

## Project Setup

### Prerequisites

- Installed Node.js
- An account on [OpenWeather](https://openweathermap.org/) to get an API key.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aymaneKT/weather-forecast-TS.git
   cd weather-forecast-TS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file in the project root (outside the `src` folder).
   - Add the following line with your OpenWeather API Key:
     ```
     VITE_WEATHER_API_KEY=your_api_key_here
     ```
4. Start the application:
   ```bash
   npm run dev
   ```

## Features

- **City Search**: Enter a city name to get weather details.
- **Automatic Suggestions**: Displays city suggestions based on user input.
- **Weather Display**: Shows current temperature, minimum, maximum, and weather description.
- **Multilingual Support**: Switch between English and Arabic.
- **Real-Time Clock Update**: Local time updates every second.

## Libraries and Dependencies

- **React**
- **@mui/material** (Material UI)
- **axios**
- **i18next**

## APIs Used

1. **Weather API**: `https://api.openweathermap.org/data/2.5/weather`
2. **Geo API**: `https://api.openweathermap.org/geo/1.0/direct`

## Author

Aymane Kabti
