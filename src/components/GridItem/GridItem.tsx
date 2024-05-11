import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Genre } from '../../types/Genre';
import { Media } from '../../types/Media';
import './GridItem.css'

interface GridItemProps<T extends Media> {
    media: T;
    title: string;
    path: string;
}

const GridItem = <T extends Media>({ media, title, path }: GridItemProps<T>) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${media.poster_path}`;

    return (
        <>
            <Link to={path} className="grid-item" style={{ textDecoration: 'none' }}>
                <img src={posterUrl} alt={title} />
                <h3>{title}</h3>
                <div className="genres-and-rating">
                    <div className="vote-average">
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                        <p>{media.vote_average}</p>
                    </div>
                    <div className="genres">
                        {media.genres.map((genre: Genre, index: number) => (
                            <p key={index}>{genre.name}</p>
                        ))}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default GridItem;
