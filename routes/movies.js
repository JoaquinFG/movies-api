const express = require('express');
// Ya tenemos el servicio lo sustituimos por los mocks
//const { moviesMock } = require('../utils/mocks/movies');
const MoviesService = require ('../services/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  //usamos el servicio
  const moviesService = new MoviesService();

  router.get('/', async function (req, res, next) {
    //creamos las etiquetas que vienen por el query
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags }); //queda sustituido//Promise.resolve(moviesMock);

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:movieId', async function (req, res, next) {
    //creamos el parametro que viene por la url
    const { movieId } = req.params;
    try {
      const movies = await moviesService.getMovie({ movieId }); //Promise.resolve(moviesMock[0]);

      res.status(200).json({
        data: movies,
        message: 'movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    //el parrametro viene del cuerpo y le ponemos un alias (movie) para que sea mas legible
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie }); //Promise.resolve(moviesMock[0].id);

      res.status(201).json({
        data: createMovieId,
        message: 'movie created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId', async function (req, res, next) {
    //aqui recibe 2 parametros el id y el movie
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie }); //Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId', async function (req, res, next) {
    //solo recibe el ID
    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId }); //Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;
