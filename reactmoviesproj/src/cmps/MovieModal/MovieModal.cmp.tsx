import React from 'react'
import Style from "./MovieModal.module.scss"


interface MovieModalProps {
    closeModal: () => void;
    movieData: any
}

export default function MovieModal({ closeModal, movieData }: MovieModalProps) {
    return (
        <div className={Style.MovieModalBackGround} onClick={closeModal}>
            <div className={Style.MovieModalMainContainer} onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
                <img src={movieData.image["original"]} style={{ height: "400px", width: "350px" }} />
            </div>
        </div>
    )
}
