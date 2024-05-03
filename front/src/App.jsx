import { useState } from 'react'
import { MapContainer,
  Polyline,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
function App() {
 const [shortestpath , setShortestPath] = useState([]);
  const [position, setPosition] = useState([36.636651770990525 , 5.245971679687501]);
  const [position2,setPosition2] = useState([36.636651770990525 , 5.245971679687501]); 

   const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const handleClick2 = (e) => {
    const { lat, lng } = e.latlng;
    setPosition2([lat, lng]);
  };

  const ClickEvents = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  const ClickEvents2 = () => {
    useMapEvents({
      click: handleClick2,
    });
    return null;
  };




  return (
    <div>
      <h1>CHOOSE UR SOURCE :</h1>
      <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Your Source location = {position[0]}==={position[1]}
        </Popup>
      </Marker>
      <ClickEvents />
    </MapContainer>

    <h1>CHOOSE UR TARGET :</h1>

    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       <Marker position={position} >
        <Popup>
          Your Source location = {position[0]}==={position[1]}
        </Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>
        Your Target location = {position2[0]}==={position2[1]}
        </Popup>
      </Marker>
      <ClickEvents2 />
    </MapContainer>


    <button onClick={async (e) => {
      e.preventDefault();
      const res = await fetch('http://localhost:5000/calculate_shortest_path',{
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
          source:position,
          target:position2,
        })
      })
      const data = await res.json();
      console.log(data.shortest_path);
      setShortestPath(data.shortest_path);
    }}>
      Get the Shortest Path
    </button>

    
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        width: 'calc(100% - 80px)',
        marginRight : "40px",
        marginLeft : "40px",
        marginBottom : "40px",
      
      }}>
        
        {
          shortestpath.length > 0 &&
          <img 
      src= "../src/sp.png"
      style={{
        width: '400px',
        height: '400px',
        objectFit: 'fill',

      
      }} alt="" />}
      </div>
      {/* <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
       <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       />
       {shortestpath && (
         <Polyline
           positions={shortestpath.map(coord => [coord[0], coord[1]])}
           color="green"
           weight={2}
         />
       )}
     </MapContainer> */ }
    
    </div>
  )
}

export default App
