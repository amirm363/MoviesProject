/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Styles from "./SearchMoviesPage.module.scss"
import axios from "axios"
import { getAuthenticationToken } from '../../services/authentication.service'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useDebounce } from 'use-debounce';
import 'animate.css';
import smallLoaderCmp from '../../cmps/smallLoaderCmp/SmallLoader.cmp';
import SmallLoaderCmp from '../../cmps/smallLoaderCmp/SmallLoader.cmp';
import MovieModal from '../../cmps/MovieModal/MovieModal.cmp';

export default function SearchMoviesPage() {
    const [moviesData, setMoviesData] = useState<any[]>([])
    const [moviesDataAsArrays, setMoviesDataAsArrays] = useState<any>({ Names: [], Genres: [], Languages: [] })
    const [openSearchInputs, setOpenSearchInputs] = useState<boolean>(false)
    const [debounceChangeIcon] = useDebounce(openSearchInputs, 400)
    const [changeIcon, setChangeIcon] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openChosenMovieModal, setOpenChosenMovieModal] = useState<boolean>(false)
    const [searchedMoviesData, setSearcedhMoviesData] = useState<any>({ Name: "", Language: "", Genres: [] })
    const [searchedMovies, setSearchedMovies] = useState<any[]>([])
    const [chosenMovie, setChosenMovie] = useState<any>({})

    useEffect(() => {
        if (openSearchInputs !== changeIcon) {
            setChangeIcon(!changeIcon)
        }
    }, [debounceChangeIcon])

    const choseMovie = ((id: number) => {
        const filteredMovie = moviesData.filter((movie: any) => movie.id === id)
        console.log(filteredMovie[0])
        setChosenMovie(filteredMovie[0])
        setOpenChosenMovieModal(!openChosenMovieModal)
    }
    )
    const getMoviesFromServer = async () => {
        try {
            const authData = getAuthenticationToken()
            console.log(authData)
            const moviesFetchedData = await axios.get("http://localhost:4000/SearchMovies", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`,
                    'ConnectedUser': `${authData.userName}`
                }
            })
            console.log("🚀 ~ file: SearchMoviesPage.tsx:44 ~ getMoviesFromServer ~ moviesFetchedData:", moviesFetchedData)
            let moviesDataSplitedArray: any = { Names: [], Genres: [], Languages: [] }
            moviesFetchedData.data.forEach((movie: any) => {
                moviesDataSplitedArray.Names.push(movie.name)
                moviesDataSplitedArray.Genres = [...moviesDataSplitedArray.Genres, ...movie.genres]
                moviesDataSplitedArray.Languages.push(movie.language)
            })

            moviesDataSplitedArray.Languages = new Set(moviesDataSplitedArray.Languages)
            moviesDataSplitedArray.Genres = new Set(moviesDataSplitedArray.Genres)
            moviesDataSplitedArray.Names = new Set(moviesDataSplitedArray.Names)

            setMoviesData(moviesFetchedData.data)
            setMoviesDataAsArrays(moviesDataSplitedArray)
        } catch (err) {
            console.log("ERROR")
        }
    }
    useEffect(() => {
        const moviesDataFromServer = getMoviesFromServer().then((result) => result);
        //  setMoviesData(moviesDataFromServer)
    }, [])
    const searchMovies = () => {
        setIsLoading(true)
        try {
            console.log(searchedMoviesData)
            const tempSearchedMovies: any[] = moviesData?.filter((movie: any) => {
                if (movie.name === searchedMoviesData.Name || movie.language === searchedMoviesData.Language || movie.genres.some((genre: string) => searchedMoviesData.Genres.includes(genre))) {
                    return movie
                }
            })
            console.log(tempSearchedMovies)
            setSearchedMovies(tempSearchedMovies)
            setIsLoading(false)
        } catch (err) {

        }

    }
    return (
        <>
            <div className={Styles.SearchMoviesMainContainer}>
                <div className={Styles.SearchBoxContainer}>
                    <span className={`${Styles.SearchBoxSearchAreaClose} ${openSearchInputs ? Styles.open : ''}`}>
                        <span className={`${Styles.SearchBoxSearchIconSpan}`} onClick={() => setOpenSearchInputs(!openSearchInputs)}>{!changeIcon ? <SearchIcon className={openSearchInputs ? "animate__animated animate__flipOutY" : "animate__animated animate__flipInY"} style={{ color: "white" }} /> : <CloseIcon className={openSearchInputs ? "animate__animated animate__flipInY" : "animate__animated animate__flipOutY"} style={{ color: "white" }} />}</span>
                        <Autocomplete
                            disablePortal
                            id="movies-names"
                            onChange={(event: any, value: string) => {
                                console.log(value)
                                setSearcedhMoviesData((prevValue: any) => ({ ...prevValue, Name: value }))
                            }}
                            options={[...moviesDataAsArrays.Names]}
                            style={{ width: "25%", height: "56px", backgroundColor: "white" }}
                            renderInput={(params) => <TextField {...params} label="Name" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="movies-names"
                            onChange={(event: any, value: string) => {
                                console.log(value)
                                setSearcedhMoviesData((prevValue: any) => ({ ...prevValue, Language: value }))
                            }}
                            options={[...moviesDataAsArrays.Languages]}
                            style={{ width: "25%", height: "56px", backgroundColor: "white" }}
                            renderInput={(params) => <TextField {...params} label="Language" />}
                        />
                        <Autocomplete
                            multiple
                            disablePortal
                            onChange={(event: any, value: string[]) => {
                                console.log(value)
                                setSearcedhMoviesData((prevValue: any) => ({ ...prevValue, Genres: value }))
                            }}
                            id="movies-names"
                            options={[...moviesDataAsArrays.Genres]}
                            style={{ width: "25%", height: "56px", backgroundColor: "white", overflow: "auto" }}
                            renderInput={(params) => <TextField {...params} label="Genres" />}
                        />
                        <span className={`${Styles.SearchBoxSearchConfirmIconSpan}`} onClick={searchMovies}>
                            {isLoading ? <SmallLoaderCmp /> : <>
                                <CheckIcon color='success' /> <label>Search</label>
                            </>
                            }
                        </span>

                    </span>
                    <div className={Styles.SearchedMoviesContinaer}>
                        {searchedMovies.map((movie: any, index: number) => <img key={`${movie.name}_${index}`} src={movie.image["medium"]} onClick={() => choseMovie(movie.id)} className={"animate__animated animate__zoomIn"}></img>)}
                    </div>
                </div>
                {openChosenMovieModal && <MovieModal closeModal={() => setOpenChosenMovieModal(false)} movieData={chosenMovie} />}
            </div>
        </>
    )
}