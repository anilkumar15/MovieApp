import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseURL = 'api/movie';
  movies$ = new BehaviorSubject<Movie[]>([]);

  constructor(private readonly http: HttpClient) {}

  genre$ = this.http
    .get<Genre[]>(`${this.baseURL}/GetGenreList`)
    .pipe(shareReplay(1));

  fecthMovieData() {
    return this.getAllMovies().pipe(
      map((result) => {
        this.movies$.next(result);
      })
    );
  }

  private getAllMovies() {
    return this.http.get<Movie[]>(this.baseURL);
  }

  getsimilarMovies(movieId: number) {
    return this.http.get<Movie[]>(
      `${this.baseURL}/GetSimilarMovies/${movieId}`
    );
  }

  getMovieById(movieId: number) {
    return this.movies$.pipe(
      map((book) => book.find((m) => m.movieId === movieId))
    );
  }

  addMovie(movie: FormData) {
    return this.http.post(this.baseURL, movie);
  }

  updateMovieDetails(movie: FormData) {
    return this.http.put(this.baseURL, movie);
  }

  deleteMovie(movieId: number) {
    return this.http.delete(`${this.baseURL}/${movieId}`);
  }
}
