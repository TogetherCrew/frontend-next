import { useLocation } from 'react-router-dom';
import getUrlParams from '../helper/routeHelper';

function Callback() {
  const location = useLocation();
  const params = getUrlParams(location);

  console.log({ params });

  return (
    <div>
      Loading...
      {/* <h2>URL Parameters:</h2>
      <ul>
        {params.map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Callback;
