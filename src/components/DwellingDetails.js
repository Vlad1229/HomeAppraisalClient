import { useParams, useNavigate, Link } from "react-router-dom";
import { wall_types, repairs, plannings, types, sell_terms } from "./DwellingParametersValues"
import useFetch from "./useFetch";

const DwellingDetails = ({setEditableDwelling}) => {
  const { id } = useParams();
  let { data: dwelling, error, isPending } = useFetch('http://127.0.0.1:5000/get_dwelling?id=' + id);
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.preventDefault()
    setEditableDwelling(dwelling)
    navigate("/edit_dwelling/" + dwelling[0])
  }

  const handleDelete = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("id", id)

    fetch('http://127.0.0.1:5000/delete_dwelling', {
      method: 'DELETE',
      body: formData,
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    }).then(() => {
      navigate('/dwellings');
    })
  }

  const handleRecalculate = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("id", id)

    fetch('http://127.0.0.1:5000/recalculate_dwelling', {
      method: 'PUT',
      body: formData,
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    }).then(() => {
      window.location.reload(false);
    })
  }

  return (
    <div className="dwelling-details">
      <div>
        <Link to="/dwellings" style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Назад</Link>
      </div>
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { dwelling && (
        <article>
          <h2>{ dwelling[1] }</h2>
          <p>Кількість кімнат: { dwelling[4] }</p>
          <p>Площа: { dwelling[5] }</p>
          <p>Поверх: { dwelling[6] }</p>
          <p>Загальна кількість поверхів: { dwelling[7] }</p>
          <p>Тип квартири: { types[dwelling[12]] }</p>
          <p>Тип стін: { wall_types[dwelling[8]] }</p>
          <p>Тип ремонту: { repairs[dwelling[9]] }</p>
          <p>Планування: { plannings[dwelling[10]] }</p>
          <p>Мебль: { dwelling[11] ? "Наявна" : "Відсутня" }</p>
          <p>Бажаний термін продажу: { sell_terms[dwelling[13]] }</p>
          <p>Вартість: { dwelling[14] }</p>
          {!dwelling[15] && <p class="error">Оцінка є застарілою</p>}
          <div>
            <Link onClick={handleEdit} style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Змінити</Link>
            <Link onClick={handleRecalculate} style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Повторно розрахувати вартість</Link>
            <Link onClick={handleDelete} style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Видалити</Link>
          </div>
        </article>
      )}
    </div>
  );
}

export default DwellingDetails;