import { React, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

const searchTypes = [
    'micro',
    'regional',
    'brewpub',
    'large',
    'planning',
    'contract',
    'proprietor',
    'closed'
  ];

function CityPage() {
    let params = useParams();
    const city = params.city;
    
    const [breweriesData, setBreweriesData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function formatTitle(title) {
        const words = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const formattedTitle = words.join(' ');
      
        return formattedTitle;
    }

    function formatPhoneNumber(phone) {
        const cleaned = String(phone).replace(/\D/g, '');
        if (cleaned.length !== 10) {
          return 'Invalid Phone Number';
        }
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
      }
  
    useEffect(() => {
      const fetchDataForCities = async () => {
        let dataByCityAndType = {};
        const fetchData = async (city, type) => {
          const url = `https://api.openbrewerydb.org/v1/breweries?by_type=${type}&by_city=${city}&per_page=100`
          try {
            const response = await fetch(url);
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
                const data = await fetchData(city, type);
                cityData[type] = data;
                })
            );

                dataByCityAndType = cityData;
            };

            await fetchDataForCityAndTypes(city);
            setBreweriesData(dataByCityAndType);
            setIsLoading(false);
        };

        fetchDataForCities();
    }, []);

    console.log(breweriesData);
    Object.entries(breweriesData).forEach(([key, list]) => {
        list.forEach(item => {
          console.log(`Key: ${key}, Item: ${item.name}`);
        });
      });

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
        <div className="bg-orange-200 p-4">
          <header className="bg-orange-50 p-4 text-center mb-4">
            <h1 className="text-4xl font-bold">{formatTitle(city)}</h1>
            <Link to="/" className='hover:underline'>Home</Link>
          </header>
          <div>
            {searchTypes.map((type, _) => (
              <div key={type} className="bg-white p-4 mb-4 rounded">
                <h2 className="text-2xl font-semibold mb-2">{formatTitle(type)}</h2>
                {breweriesData[type].length > 0 ? (
                  breweriesData[type].map((brewery, _) => (
                    <div key={brewery.id} className="p-2 border-b border-gray-200">
                      <h3 className="text-lg font-semibold mb-1">{brewery.name}</h3>
                      <p className="text-gray-600">{brewery.street}</p>
                      <p className="text-gray-600">{brewery.postal_code}</p>
                      <p className="text-gray-600">{formatPhoneNumber(brewery.phone)}</p>
                      <p className="text-blue-500 hover:underline">
                        <a href={brewery.website_url} target="_blank">
                          {brewery.website_url}
                        </a>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No breweries of this type in {formatTitle(city)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

export default CityPage;
