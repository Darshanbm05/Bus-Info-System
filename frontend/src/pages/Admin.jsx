import { useEffect, useState } from "react";
import { API } from "../api";

export default function Admin() {
    const [places, setPlaces] = useState([]);
    const [placeName, setPlaceName] = useState("");

    const [busData, setBusData] = useState({
        from_place: "",
        to_place: "",
        service: "",
        via: "",
        depart_time: ""
    });

    useEffect(() => {
        fetch(`${API}/places`)
            .then(res => res.json())
            .then(setPlaces);
    }, []);

    const addPlace = () => {
        fetch(`${API}/places`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: placeName })
        }).then(() => window.location.reload());
    };

    const addBus = () => {
        fetch(`${API}/buses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(busData)
        }).then(() => alert("Bus Added!"));
    };

    return (
        <div>
            <h2>Admin Panel</h2>

            <h3>Add Place</h3>
            <input placeholder="Place name" onChange={e => setPlaceName(e.target.value)} />
            <button onClick={addPlace}>Add</button>

            <h3>Add Bus</h3>
            <input placeholder="From" onChange={e => setBusData({...busData, from_place: e.target.value})}/>
            <input placeholder="To" onChange={e => setBusData({...busData, to_place: e.target.value})}/>
            <input placeholder="Service Type" onChange={e => setBusData({...busData, service: e.target.value})}/>
            <input placeholder="Via Places" onChange={e => setBusData({...busData, via: e.target.value})}/>
            <input placeholder="Departure Time" onChange={e => setBusData({...busData, depart_time: e.target.value})}/>
            <button onClick={addBus}>Add Bus</button>
        </div>
    );
}
