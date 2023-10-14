import React from 'react'
import Dashboard from './components/Dashboard';
import stringSimilarity from 'string-similarity';

const breweryTypes = [
  'micro',
  'regional',
  'brewpub',
  'large',
  'planning',
  'contract',
  'proprietor',
  'closed',
  'reset'
];

const cities = [
  "new_york",
  "los_angeles",
  "chicago",
  "san_diego",
  "san_francisco",
  "seattle",
  "portland",
  "austin",
  "denver",
  "philadelphia",
  "boston",
  "washington",
  "nashville",
  "atlanta"
]

const App = () => {
  const [searchedCities, setSearchedCities] = React.useState(cities)
  const [searchTypes, setSearchTypes] = React.useState(breweryTypes)

  const handleTypeChange = (type) => {
    setSearchTypes(type == 'reset' ? breweryTypes : [type])
  }

  const handleCityChange = (inputCity) => {
    setSearchedCities(inputCity == '' ? cities : searchedCities.filter(city => city.toLowerCase().includes(inputCity.trim().toLowerCase().replace(' ', '_'))));
  };
  

  return (
    <div className='bg-main bg-cover h-screen flex justify-center items-center'>
      <Dashboard breweryTypes={breweryTypes} breweryCities={searchedCities} searchTypes={searchTypes}
        handleTypeChange={handleTypeChange} handleCityChange={handleCityChange} className=""/>
    </div>
  )
}

export default App