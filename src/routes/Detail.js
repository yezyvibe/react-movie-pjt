import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.movie}>
        <img
          className={styles.movie__img}
          src={movie.large_cover_image}
          alt={movie.title}
        />
        <div>
          <h1 className={styles.movie__title}>{movie.title}</h1>
          <h3 className={styles.movie__year}>{movie.year}</h3>
          <p className={styles.movie__description}>
            {movie.description_intro}
            {/* {movie.description_intro.length > 400
              ? `${movie.description_intro.slice(0, 400)}...`
              : movie.description_intro} */}
          </p>
          <ul className={styles.movie__genres}>
            {movie.genres && movie.genres.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Detail;
