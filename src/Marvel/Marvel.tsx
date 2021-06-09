import React, { useState, useCallback, useEffect, ChangeEvent } from "react";
import { MarvelData } from './IMarvel';
import "./Marvel.css";

export const Marvel: React.FC = () => {
  const [data, setData] = useState<MarvelData[]>([]);
  const [search, setSearch] = useState("Iron Man");

  const url = React.useMemo(
    () =>
      "https://gateway.marvel.com/v1/public/characters?apikey=83bba33de30388893242f7b07e6a40af&hash=c1a33c2fd5105cd015f3d5027073317d&ts=1&nameStartsWith=" +
      search,
    [search]
  );

  console.log(data);

  const fetchData = useCallback(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        console.log('hello', d);
        if (d && d.data?.results && d.data.results.length > 0) {
          setData(d.data.results);
        }
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if(e.target && e.target) {
        setSearch(e.target.value);
    }
  };

  return (
    <div className="marvel__container">
        <input type="text" className="marvel__input" onChange={handleChange} defaultValue={search}/>
        <div className="marvel__cards">
        {data && data.length > 0 &&
            data.map((each: MarvelData) => (
            <div key={each.id} className="marvel__card">
                <img className="marvel__image" src={each.thumbnail.path + '.' + each.thumbnail.extension} alt={each.name} />
                <h4 className="marvel__heading">{each.name}</h4>
                <p>{each.description}</p>
            </div>
            ))}
        </div>
    </div>
  );
};
