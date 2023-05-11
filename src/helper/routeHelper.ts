import { Location } from 'react-router-dom';

export default function getUrlParams(location: Location): {
  [key: string]: string;
} {
  const searchParams = new URLSearchParams(location.search);
  const params: { [key: string]: string } = {};

  Array.from(searchParams.entries()).forEach(([key, value]) => {
    params[key] = value;
  });

  return params;
}
