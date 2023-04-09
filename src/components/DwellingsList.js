import { Link } from 'react-router-dom';

const DwellingsList = ({ dwellings }) => {

  return (
    <div className="dwellings-list">
      {dwellings.map(dwelling => (
        <div className="dwelling-preview" key={dwelling[0]} >
          <Link to={`/dwellings/${dwelling[0]}`}>
            <h2>{ dwelling[1] }</h2>
            <p>Вартість: { dwelling[14] }</p>
            {!dwelling[15] && <p class='error'>Оцінка є застарілою</p>}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DwellingsList;