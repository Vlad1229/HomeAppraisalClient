import { useState } from "react";
import { Link } from "react-router-dom";
import DwellingsList from "./DwellingsList";
import useFetch from "./useFetch";

const DwellingsPage = ({setEditableDwelling}) => {
  const { error, isPending, data: dwellings } = useFetch('http://127.0.0.1:5000/get_dwellings')
  const [searchText, setSearchText] = useState('');
  const search_dwellings = dwellings ? dwellings.filter(dwellings => dwellings[1].toLowerCase().includes(searchText.toLowerCase())) : dwellings;

  return (
    <div className="dwellings">
      <header>
        <h2>Квартири</h2>
        <input type="text" required value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <Link to="/create_dwelling" style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Додати</Link>
      </header>
      {error && <div>{ error }</div>}
      {isPending && <div>Loading...</div>}
      {search_dwellings && <DwellingsList dwellings={search_dwellings}/>}
    </div>
  );
}

export default DwellingsPage;