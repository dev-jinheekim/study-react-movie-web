import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  componentDidMount () {
    this.getMovies();
  }

  async getMovies() {
    const {
      data: {
        data : { movies }
      }
    } = await axios.get('https://yts.mx/api/v2/list_movies.json');
    console.log(movies);
    this.setState({ movies, isLoading: false });
  }

  render() {
    const { isLoading, movies } = this.state;
    return <section className="container">
      { isLoading ? (
        <div className="loader">
          <span className="loader__text">"Loading..."</span>
        </div>
      ) : (
        <div className="movies">
          {
            movies.map(movie => (
              <Movie id={movie.id}
                     year={movie.year}
                     title={movie.title}
                     summary={movie.summary}
                     poster={movie.medium_cover_image}/>
            ))
          }
        </div>
      )}
    </section>;
  };

}

export default App;
