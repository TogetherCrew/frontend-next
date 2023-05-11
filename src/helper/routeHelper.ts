import { Location } from 'react-router-dom';

export default function getUrlParams(location: Location) {
  const searchParams = new URLSearchParams(location.search);
  const params = Array.from(searchParams.entries());

  return params;
}
