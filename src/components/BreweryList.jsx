import React, { useState, useEffect } from 'react';

const BreweryList = ({ breweryCities, breweriesData, className }) => {
 
function formatCityTitle(title) {
  const words = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const formattedTitle = words.join(' ');

  return formattedTitle;
}

const breweryTypeCounts = new Map();

breweryCities.forEach(city => {
  const cityData = breweriesData[city];

  if (cityData && typeof cityData === 'object') {
    for (const breweryType in cityData) {
      if (cityData.hasOwnProperty(breweryType)) {
        cityData[breweryType].forEach(brewery => {
          const type = brewery.brewery_type;
          breweryTypeCounts.set(type, (breweryTypeCounts.get(type) || 0) + 1);
        });
      }
    }
  }
});

const filteredBreweryTypes = Array.from(breweryTypeCounts.keys()).filter(type => breweryTypeCounts.get(type) > 0);

return (
  <div className={`p-4 ${className}`}>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">City</th>
            {filteredBreweryTypes.map(breweryType => (
              <th key={breweryType} className="px-4 py-2">{formatCityTitle(breweryType)} Breweries</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {breweryCities.map(city => (
            <tr key={city}>
              <td className="px-4 py-2 font-bold">{formatCityTitle(city)}</td>
              {filteredBreweryTypes.map(breweryType => (
                <td key={breweryType} className="px-4 py-2">
                  {breweriesData[city]?.[breweryType]?.length || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-2 font-bold underline">Total</td>
            {filteredBreweryTypes.map(breweryType => (
              <td key={breweryType} className="px-4 py-2">
                {breweryCities.reduce((acc, city) => {
                  return acc + (breweriesData[city]?.[breweryType]?.length || 0);
                }, 0)
                }
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);
};

export default BreweryList;
