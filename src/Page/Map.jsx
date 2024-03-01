import React, { useState } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import MapClient from '../client/MapClient'

const Map = () => {
    const [position, setPosition] = useState([0, 0]);
    const [zoom, setZoom] = useState(2);
  
    const handlerMap = (item) => {
      if (item && (item.districts || item?.districtData)) {
        const locations = Object.values(item?.districts || item?.districtData);
        const bounds = calculateBounds(locations);
        setPosition(bounds.position);
        setZoom(bounds.zoom);
      }
    };
  
    const calculateBounds = (locations) => {
      if (!locations || Object.keys(locations).length === 0) {
        return {
          position: [0, 0],
          zoom: 2,
        };
      }
  
      const bounds = Object.values(locations).reduce(
        (acc, location) => {
          const coordinates = location.coordinates || location;
          if (
            coordinates &&
            Array.isArray(coordinates) &&
            coordinates.length > 0 &&
            Array.isArray(coordinates[0]) &&
            coordinates[0].length === 2
          ) {
            const minLat = Math.min(...coordinates.map(coord => coord[0]));
            const minLng = Math.min(...coordinates.map(coord => coord[1]));
            const maxLat = Math.max(...coordinates.map(coord => coord[0]));
            const maxLng = Math.max(...coordinates.map(coord => coord[1]));
  
            return [
              Math.min(acc[0], minLat),
              Math.min(acc[1], minLng),
              Math.max(acc[2], maxLat),
              Math.max(acc[3], maxLng),
            ];
          }
  
          return acc;
        },
        [Infinity, Infinity, -Infinity, -Infinity]
      );
  
      const position = [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2];
      const zoom = locations.every(location => location.coordinates) ? 5 : 14;
  
      return {
        position,
        zoom,
      };
    };
    return (
        <div className='w-full flex items-start justify-start'>
            <Sidebar handlerMap={(item) => handlerMap(item)}/>
            <div className='w-[85%] flex items-start justify-start flex-col'>
                <Navbar />
                <MapClient position={position} zoom={zoom}/>
            </div>
        </div>
    )
}

export default Map