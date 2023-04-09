import { useParams, useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";

const RegionDetails = ({setEditableRegion}) => {
  const { id } = useParams();
  const { data: region, error, isPending } = useFetch('http://127.0.0.1:5000/get_region?id=' + id);
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.preventDefault()
    setEditableRegion(region)
    navigate("/edit_region/" + region[0])
  }

  const handleDelete = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("id", id)

    fetch('http://127.0.0.1:5000/delete_region', {
      method: 'DELETE',
      body: formData
    }).then(() => {
      navigate('/regions');
    })
  }

  return (
    <div className="region-details">
      <div>
        <Link to="/regions" style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Назад</Link>
      </div>
      { isPending && <div>Завантаження...</div> }
      { error && <div>{ error }</div> }
      { region && (
        <article>
          <h2>{ region[1] }</h2>
          <p>Значення району: { region[9] }</p>
          <p>Рівень злочинності: { region[2] }</p>
          <p>Наявність ріки: { region[3] ? "Так" : "Ні" }</p>
          <p>Концентрація оксиду азоту: { region[4] }</p>
          <p>Середня кількість кімнат: { region[5] }</p>
          <p>Середній податок на нерухомість: { region[6] }</p>
          <p>Відношення кількості учнів до вчителів: { region[7] }</p>
          <p>Відсоток населення з низьким соціальним статусом: { region[8] }</p>
          <div>
            <Link onClick={handleEdit} style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Змінити</Link>
            <Link onClick={handleDelete} style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Видалити</Link>
          </div>
        </article>
      )}
    </div>
  );
}

export default RegionDetails;