import React, { useState } from 'react'
import Style from "./MovieModal.module.scss"


interface MovieModalProps {
    closeModal: () => void;
    movieData: any
    moviesWithSameGenres: any[];
    choseMovieFunction: (movieData: any) => void;
}

export default function MovieModal({ closeModal, movieData, moviesWithSameGenres, choseMovieFunction }: MovieModalProps) {
    const numberOfPaginationPages: number = Math.round(moviesWithSameGenres.length / 2)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [numberOfPages, setNumberOfPages] = useState<Array<any>>(new Array(numberOfPaginationPages).fill(0))
    return (
        <div className={Style.MovieModalBackGround} onClick={closeModal}>
            <div className={`${Style.MovieModalMainContainer} animate__animated animate__zoomIn animate__faster`} onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
                <img src={movieData.image["original"]} />
                <div className={Style.MovieDataDiv}>
                    <div className={Style.MoviesDataFirstRow}>
                        <span>Name:</span>
                        <span>Language:</span>
                        <span>Genres:</span>
                    </div>
                    <div className={Style.MoviesDataSecondRow}>
                        <span>{movieData.name}</span>
                        <span>{movieData.language}</span>
                        <span>{movieData.genres.toString()}</span>
                    </div>
                </div>
                <span className={Style.LinkToShowInfoSpan}><a href={movieData.url} target='_blank' rel="noreferrer">More info about the show</a></span>
                <div className={Style.MoviesWithTheSameGenresContainer}>
                    <span>Movies from the same genres</span>
                    <div>
                        {moviesWithSameGenres.slice((currentPage - 1) * 2, (currentPage) * 2).map((movie: any, index: number) => {
                            return <img key={`${movie.name}_${index}`} src={movie.image["medium"]} alt="moviePhoto" className='animate__animated animate__zoomIn animate__faster' onClick={() => choseMovieFunction(movie)} />
                        })}
                        <ul className={Style.PaginationUl}>{numberOfPages.map((li: any, index: number) => {
                            return <li key={index} className={`${Style.PaginationLi} ${currentPage === index + 1 ? Style.PaginationLiClicked : ""}`} style={{ color: index + 1 === currentPage ? "red" : "white" }} onClick={() => setCurrentPage(index + 1)}>{index + 1}</li>
                        })}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
