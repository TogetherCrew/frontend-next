import { Location, NavigateFunction } from 'react-router-dom';

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

export function removeParamsExcept(
  location: Location,
  paramsToKeep: string[],
  navigate: NavigateFunction
): void {
  const searchParams = new URLSearchParams(location.search);
  const paramsToDelete: string[] = [];

  searchParams.forEach((value, key) => {
    if (!paramsToKeep.includes(key)) {
      paramsToDelete.push(key);
    }
  });

  paramsToDelete.forEach((key) => {
    searchParams.delete(key);
  });

  const newSearch = searchParams.toString();
  const newURL = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;

  navigate(newURL, { replace: true });
}
