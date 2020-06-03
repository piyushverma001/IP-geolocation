// import React, { Component } from 'react'
// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


  

// class Maps extends Component {
//     render() {
//         return (
//             <LeafletMap
//             className={}
//         center={[50, 10]}
//         zoom={6}
//         maxZoom={10}
//         attributionControl={true}
//         zoomControl={true}
//         doubleClickZoom={true}
//         scrollWheelZoom={true}
//         dragging={true}
//         animate={true}
//         easeLinearity={0.35}
//       >
//         <TileLayer
//           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         <Marker position={[50, 10]}>
//           <Popup>
//             Popup for any custom information.
//           </Popup>
//         </Marker>
//       </LeafletMap>
//         )
//     }
// }


// export default Maps;


import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


import styles from './Maps.module.css'

const Maps = ({location}) => {
    
    console.log(location)
   
  
    return (
        <LeafletMap
        className={styles.mapcontainer}
        center={location}
        zoom={10}
        maxZoom={15}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={location}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    )
}

export default Maps
