import { Link } from 'react-router-dom';

const RegionList = ({ regions }) => {

  return (
    <div className="regions-list">
      {regions.map(region => (
        <div className="region-preview" key={region[0]} >
          <Link to={`/regions/${region[0]}`}>
            <h2>{ region[1] }</h2>
            <p>Значення району: { region[9] }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RegionList;