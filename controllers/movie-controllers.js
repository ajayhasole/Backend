import { decrypt } from 'dotenv';
import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import mongoose, { mongo } from 'mongoose';
import Admin from '../models/Admin.js';
export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; //bearer token
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found!" });

    }

    let adminId;

    //verify token   //decrypted will give id of user in decrypted format
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.messsage}` })
        }
        else {
            adminId = decrypted.id;
            return;

        }


    })//verification successful



    //validation for movie
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title && title.trim() === "" && !description && description.trim() == "" && !posterUrl && posterUrl.trim() === "") {
        return res.status(422).json({ messages: "Invalid Input" });
    }

    //create new movie

    let movie;
    try {
        movie = new Movie({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin: adminId,
            posterUrl,

        });

        const session = await mongoose.startSession(); //start the session
        const adminUser = await Admin.findById(adminId); //find the adminId in admin the one who's adding a movie
        await session.startTransaction(); //start transaction
        await movie.save({ session }); //movie gets saved in the session
        adminUser.addedMovies.push(movie); //push the movie inside the addedmovie array
        await adminUser.save({ session }); // save the adminuser changes
        await session.commitTransaction(); //commit the session changes
    } catch (error) {
        return console.log(error);

    }

    //validation for movie if it exist

    if (!movie) {
        return res.status(500).json({ message: "Request failed!" });
    }

    return res.status(201).json({ movie })

}
//Now your re body should compulsorily contain all the fields of movie schema

// =================================

export const getAllMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();//will find all the movies  
    } catch (error) {
        return console.log(error);


    }

    if (!movies) {
        return res.status(500).json({ message: "Request failed!" })
    }
    return res.status(200).json({ movies });

}


export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);

    } catch (error) {
        return console.log(error);
    }

    if (!movie) {
        return res.status(404).json({ message: "Invalid Movie Id" });
    }

    return res.status(200).json({ movie });
}

export const deleteMovie = async (req, res, next) => {
    const movieId = req.params.id;

    try {
        
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
