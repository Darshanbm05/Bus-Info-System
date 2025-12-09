import { useEffect, useState } from "react";
import { API } from "../api";
import BusCard from "../components/BusCard";

export default function TimeTable() {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState("");
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        fetch(`${API}/places`)
            .then(res => res.json())
            .then(setPlaces);
    }, []);

    const loadBuses = () => {
        fetch(`${API}/buses/${selectedPlace}`)
            .then(res => res.json())
            .then(setBuses);
    };

    return (
        <div>
            <h2>Select Place</h2>
            <select onChange={e => setSelectedPlace(e.target.value)}>
                <option>Choose</option>
                {places.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                ))}
            </select>

            <button onClick={loadBuses}>Show Buses</button>

            <div>
                {buses.map(b => (
                    <BusCard key={b.id} bus={b} />
                ))}
            </div>
        </div>
    );
}
