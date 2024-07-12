import  express from 'express';
import { addMovie, deleteMovie, getAllMovies, getMovieById } from '../controllers/movie-controllers.js';


const movieRouter = express.Router();

movieRouter.post('/',addMovie);
movieRouter.get('/',getAllMovies);
movieRouter.get('/:id',getMovieById);
movieRouter.delete('/:id', deleteMovie);

export default movieRouter;