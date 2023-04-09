import { useState } from "react";
import { Link } from "react-router-dom";
import RegionList from "./RegionList";
import useFetch from "./useFetch";

const RegionsPage = ({setEditableRegion}) => {
  const { error, isPending, data: regions } = useFetch('http://127.0.0.1:5000/get_regions')
  const [searchText, setSearchText] = useState('');
  const search_regions = regions ? regions.filter(region => region[1].toLowerCase().includes(searchText.toLowerCase())) : regions;

  return (
    <div className="regions">
      <header>
        <h2>Райони</h2>
        <input type="text" required value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <Link to="/create_region" style={{color: 'white', backgroundColor: '#f1356d', borderRadius: '8px'}}>Додати район</Link>
      </header>
      {error && <div>{ error }</div>}
      {isPending && <div>Завантаження...</div>}
      {regions && <RegionList regions={search_regions}/>}
    </div>
  );
}

export default RegionsPage;