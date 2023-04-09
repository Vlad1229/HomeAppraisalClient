import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCreateRegion = ({isCreating}) => {
  const { id } = useParams();
  const [regionName, setRegionName] = useState('');
  const [crimeRate, setCrimeRate] = useState(0);
  const [river, setRiver] = useState(false);
  const [nitricOxides, setNitricOxides] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [pupilTeacherRatio, setPupilTeacherRatio] = useState(0);
  const [lowerStatusPercentage, setLowerStatusPercentage] = useState(0);
  const [isPending, setIsPending] = useState(!isCreating);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  if (!isCreating && !isDataLoaded) {
    fetch('http://127.0.0.1:5000/get_region?id=' + id)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setRegionName(data.result[1]);
      setCrimeRate(data.result[2]);
      setRiver(data.result[3]);
      setNitricOxides(data.result[4]);
      setRooms(data.result[5]);
      setTaxRate(data.result[6]);
      setPupilTeacherRatio(data.result[7]);
      setLowerStatusPercentage(data.result[8]);
      setIsPending(false);
      setIsDataLoaded(true)
    })
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (!isCreating) formData.append("id", id)
    formData.append("region_name", regionName)
    formData.append("crime_rate", crimeRate)
    formData.append("river", river)
    formData.append("nitric_oxides", nitricOxides)
    formData.append("rooms_average_num", rooms)
    formData.append("tax_rate", taxRate)
    formData.append("pupil_teacher_ratio", pupilTeacherRatio)
    formData.append("lower_status_percentage", lowerStatusPercentage)

    const url = isCreating ? 'http://127.0.0.1:5000/add_region' : 'http://127.0.0.1:5000/update_region'
    const method = isCreating ? 'POST' : 'PUT'

    fetch(url, {
      method: method,
      body: formData
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        navigate("/regions")
      }
    })
  }

  return (
    <div className="edit_create_region">
      {isCreating && <h2>Додавання нового району</h2>}
      {!isCreating && !isPending && <h2>Оновлення даних про район</h2>}
      {!isPending && <form onSubmit={handleSubmit}>
        <label>Назва:</label>
        <input type="text" required value={regionName} onChange={(e) => setRegionName(e.target.value)} />
        <label>Рівень злочинності:</label>
        <input type="number" step="0.001" required value={crimeRate} onChange={(e) => setCrimeRate(e.target.value)} />
        <div>
          <label>Наявність ріки:</label>
          <input type="checkbox" defaultChecked={river} onChange={(e) => setRiver(e.target.checked)} />
        </div>
        <label>Концентрація оксиду азоту:</label>
        <input type="number" step="0.001" required value={nitricOxides} onChange={(e) => setNitricOxides(e.target.value)} />
        <label>Середня кількість кімнат:</label>
        <input type="number" step="0.001" required value={rooms} onChange={(e) => setRooms(e.target.value)} />
        <label>Середній податок на нерухомість:</label>
        <input type="number" step="0.001" required value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
        <label>Відношення кількості учнів до вчителів:</label>
        <input type="number" step="0.001" required value={pupilTeacherRatio} onChange={(e) => setPupilTeacherRatio(e.target.value)} />
        <label>Відсоток населення з низьким соціальним статусом:</label>
        <input type="number" step="0.001" required value={lowerStatusPercentage} onChange={(e) => setLowerStatusPercentage(e.target.value)} />
        <button>{isCreating ? "Додати" : "Оновити"}</button>
      </form>}
    </div>
  );
}

export default EditCreateRegion;