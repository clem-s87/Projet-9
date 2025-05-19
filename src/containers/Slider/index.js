import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Si les données ne sont pas disponibles, afficher un message
  const byDateAsc = data?.focus
    ? data.focus.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

    useEffect(() => {
      if (byDateAsc.length === 0) {
        return undefined; // Retour explicite pour éviter l'erreur ESLint
      }
    
      const interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000);
    
      return () => {
        clearInterval(interval);
      };
    }, [byDateAsc]);

  if (byDateAsc.length === 0) {
    return <div>Aucun événement à afficher.</div>;
  }

return (
  <div className="SlideCardList">
    {byDateAsc.map((event, idx) => (
      <div
        key={event.title}
        className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
      >
        <img src={event.cover} alt="forum" />
        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
    ))}

    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">
        {byDateAsc.map((item, indexRadio) => (
          <input
            key={item.title}
            type="radio"
            name="radio-button"
            checked={index === indexRadio}
            onChange={() => setIndex(indexRadio)}
          />
        ))}
      </div>
    </div>
  </div>
);
};

export default Slider;
