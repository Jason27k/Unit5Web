import React, { useState, useEffect } from 'react';
import BreweryMenu from './BreweryMenu'
import BreweryList from './BreweryList'
import { Input } from './ui/input';

const baseURL = 'https://api.openbrewerydb.org/breweries?';

const Dashboard = ({ breweryTypes, breweryCities, searchTypes, handleTypeChange, handleCityChange, className }) => {
    const [breweriesData, setBreweriesData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchDataForCities = async () => {
        const dataByCityAndType = {};
  
        const fetchData = async (city, type) => {
          const cityURL = `${baseURL}by_type=${type}&by_city=${city}&per_page=100`
          try {
            const response = await fetch(cityURL);
            if (response.ok) {
              const data = await response.json();
              return data;
            } else {
              console.error(`Failed to fetch data for ${city} (${type}): ${response.status}`);
            }
          } catch (error) {
            console.error(`Failed to fetch data for ${city} (${type}): ${error}`);
          }
  
          return [];
        };
  
        const fetchDataForCityAndTypes = async (city) => {
          const cityData = {};
  
          await Promise.all(
            searchTypes.map(async (type) => {
              if (type === 'reset') {
                return;
              }
              const data = await fetchData(city, type);
              cityData[type] = data;
            })
          );
  
          dataByCityAndType[city] = cityData;
        };
  
        const fetchDataForAllCities = async () => {
          await Promise.all(breweryCities.map(fetchDataForCityAndTypes));
        };
  
        await fetchDataForAllCities();
        setBreweriesData(dataByCityAndType);
        setIsLoading(false);
      };
  
      fetchDataForCities();
    }, [breweryCities, searchTypes]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    const totalBreweryCount = Object.values(breweriesData).reduce((total, cityData) => {
      return total + (cityData ? Object.values(cityData).reduce((cityTotal, breweryTypeData) => {
        return cityTotal + (Array.isArray(breweryTypeData) ? breweryTypeData.length : 0);
      }, 0) : 0);
    }, 0);

    const citiesWithBreweries = Object.keys(breweriesData);
        const mostBreweriesCity = citiesWithBreweries.reduce((cityWithMost, currentCity) => {
            if (!cityWithMost || citiesWithBreweries[currentCity] > citiesWithBreweries[cityWithMost]) {
            return currentCity;
            }
            return cityWithMost;
    }, null);
    

    function formatCityTitle(title) {
      if (title != null) {
        const words = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const formattedTitle = words.join(' ');
      
        return formattedTitle;
      }
        return 'None'
    }

  return (
    <div className={`w-3/5 ${className}`}>
      <div className="flex flex-row mb-2">
        <div className="w-1/3 my-auto bg-black/50 h-full p-10 rounded-lg text-center text-base">
          <h2 className="text-2xl text-white font-bold">Total Breweries: {totalBreweryCount}</h2>
        </div>
        <div className="w-1/3 mx-4 bg-black/50 h-full p-10 rounded-lg text-center text-base">
          <h2 className="text-2xl text-white font-bold">
            City with the most breweries: {formatCityTitle(mostBreweriesCity)}
          </h2>
        </div>
        <div className="bg-black/50 w-1/3 h-full p-10 rounded-lg text-center text-base">
          <h2 className="text-2xl text-white font-bold">
            Number of cities: {citiesWithBreweries.length}
          </h2>
        </div>
      </div>
      <div className='flex flex-row items-center flex-wrap bg-orange-300 overflow-scroll rounded-2xl p-4 shadow-lg shadow-white'>
        <div className='flex flex-row flex-wrap justify-center items-center w-screen'>
          <label htmlFor="city" className='my-2 font-bold'>Search by City: </label>
          <Input id="city" onChange={(e) => handleCityChange(e.target.value)} 
          placeholder="Enter a city name"
          className="border border-gray-400 rounded-md py-1 w-1/3 mx-3 my-2 inline-block"
          />
          <BreweryMenu breweryTypes={breweryTypes} handleTypeChange={handleTypeChange} className='my-2'/>
        </div>
        <BreweryList breweryCities={breweryCities} breweriesData={breweriesData} className='bg-white/50 rounded-lg'/>
      </div>
    </div>
  )
}

export default Dashboard


