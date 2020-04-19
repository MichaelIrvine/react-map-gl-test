import React, { useState, useEffect } from 'react';
import './App.scss';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import parkData from './data/parks.json';

function App() {
  const [viewPort, setViewPort] = useState({
    latitude: 49.263437,
    longitude: -123.115533,
    zoom: 11,
    width: '90vw',
    height: '90vh',
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className='container'>
      <ReactMapGl
        {...viewPort}
        className='map-gl'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/michaelirvine/ck96q8afq40e21io5kvaklbmo'
        onViewportChange={(viewport) => {
          setViewPort(viewport);
        }}
      >
        {parkData.map((park) => (
          <Marker
            key={park.recordid}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className='btn--park-marker'
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src='/parkmarker.svg' alt='Park Location' />
            </button>
          </Marker>
        ))}
        {selectedPark && (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.fields.name}</h2>
            </div>
          </Popup>
        )}
      </ReactMapGl>
    </div>
  );
}

export default App;
