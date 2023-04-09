import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { wall_types, repairs, plannings, types, sell_terms } from "./DwellingParametersValues"
import useFetch from "./useFetch";

const EditCreateRegion = ({isCreating}) => {
  const { id } = useParams();
  const [address, setAddress] = useState('');
  const { error: _, isPending: isPendingRegions, data: regions } = useFetch('http://127.0.0.1:5000/get_regions')
  const [region, setRegion] = useState(0);
  const [roomsNum, setRoomsNum] = useState(0);
  const [size, setSize] = useState(0);
  const [floor, setFloor] = useState(0);
  const [totalFloors, setTotalFloors] = useState(0);
  const [walls, setWalls] = useState(0);
  const [repair, setRepair] = useState(0);
  const [planning, setPlanning] = useState(0);
  const [furniture, setFurniture] = useState(false);
  const [type, setType] = useState(0);
  const [sellTerm, setSellTerm] = useState(0);

  const [isPendingDwelling, setIsPendingDwelling] = useState(!isCreating);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  if (!isCreating && !isDataLoaded) {
    fetch('http://127.0.0.1:5000/get_dwelling?id=' + id, {
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setAddress(data.result[1]);
      setRegion(data.result[3]);
      setRoomsNum(data.result[4]);
      setSize(data.result[5]);
      setFloor(data.result[6]);
      setTotalFloors(data.result[7]);
      setWalls(data.result[8]);
      setRepair(data.result[9]);
      setPlanning(data.result[10]);
      setFurniture(data.result[11]);
      setType(data.result[12]);
      setSellTerm(data.result[13]);
      setIsPendingDwelling(false);
      setIsDataLoaded(true)
    })
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (!isCreating) formData.append("id", id);
    formData.append("address", address);
    formData.append("region_id", region);
    formData.append("rooms_num", roomsNum);
    formData.append("size", size);
    formData.append("floor", floor);
    formData.append("floors_total", totalFloors);
    formData.append("walls", walls);
    formData.append("repair", repair);
    formData.append("planning", planning);
    formData.append("furniture", furniture);
    formData.append("type", type);
    formData.append("sale_term", sellTerm);

    const url = isCreating ? 'http://127.0.0.1:5000/add_dwelling' : 'http://127.0.0.1:5000/update_dwelling'
    const method = isCreating ? 'POST' : 'PUT'

    fetch(url, {
      method: method,
      body: formData,
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        navigate("/dwellings")
      }
    })
  }

  const isPending = isPendingDwelling || isPendingRegions

  return (
    <div className="edit_create_dwelling">
      {isCreating && <h2>Додавання даних про квартиру</h2>}
      {!isCreating && !isPending && <h2>Оновлення даних про квартиру</h2>}
      {!isPending && <form onSubmit={handleSubmit}>
        <label>Адреса: </label>
        <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
        <label>Район: </label>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((region) => (
            <option key={region[0]} value={region[0]}>{region[1]}</option>
          ))}
        </select>
        <label>Кількість кімнат: </label>
        <input type="number" step="1" required value={roomsNum} onChange={(e) => setRoomsNum(e.target.value)} />
        <label>Площа: </label>
        <input type="number" step="0.1" required value={size} onChange={(e) => setSize(e.target.value)} />
        <label>Поверх: </label>
        <input type="number" step="1" required value={floor} onChange={(e) => setFloor(e.target.value)} />
        <label>Загальна кількість поверхів: </label>
        <input type="number" step="1" required value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} />
        <label>Тип квартири: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((type, index) => (
            <option key={index} value={index}>{type}</option>
          ))}
        </select>
        <label>Тип стін: </label>
        <select value={walls} onChange={(e) => setWalls(e.target.value)}>
          {wall_types.map((wall_type, index) => (
            <option key={index} value={index}>{wall_type}</option>
          ))}
        </select>
        <label>Тип ремонту: </label>
        <select value={repair} onChange={(e) => setRepair(e.target.value)}>
          {repairs.map((repair, index) => (
            <option key={index} value={index}>{repair}</option>
          ))}
        </select>
        <label>Планування: </label>
        <select value={planning} onChange={(e) => setPlanning(e.target.value)}>
          {plannings.map((planning, index) => (
            <option key={index} value={index}>{planning}</option>
          ))}
        </select>
        <label>Бажаний термін продажу: </label>
        <select value={sellTerm} onChange={(e) => setSellTerm(e.target.value)}>
          {sell_terms.map((sell_term, index) => (
            <option key={index} value={index}>{sell_term}</option>
          ))}
        </select>
        <div>
          <label>Наявність меблів:</label>
          <input type="checkbox" defaultChecked={furniture} onChange={(e) => setFurniture(e.target.checked)} />
        </div>

        <button>{isCreating ? "Додати" : "Оновити"}</button>
      </form>}
    </div>
  );
}

export default EditCreateRegion;