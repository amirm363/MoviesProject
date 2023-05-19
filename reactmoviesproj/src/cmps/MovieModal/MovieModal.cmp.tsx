import React from 'react'
import Style from "./MovieModal.module.scss"


interface MovieModalProps {
    closeModal: () => void;
    movieData: any
}

export default function MovieModal({ closeModal, movieData }: MovieModalProps) {
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
            </div>
        </div>
    )
}
