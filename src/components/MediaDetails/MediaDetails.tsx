import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Genre } from '../../types/Genre';
import { Media } from '../../types/Media';
import './MediaDetails.css'

interface MediaDetailsProps<T extends Media> {
    media: T | null;
    title: string | null;
    releaseDate: string | null;
    notFound: boolean;
    mediaType: string;
}

const MediaDetails = <T extends Media>({ media, title, releaseDate, notFound, mediaType }: MediaDetailsProps<T>) => {
    const navigate = useNavigate();
    const { activeTab } = useAppContext();
    const backdropUrl = `https://image.tmdb.org/t/p/original${media?.backdrop_path}`;

    return (
        <div className="media-details-container">
            {media ? (
                <div>
                    <button className="back-button" onClick={() => { navigate(`/${activeTab}`) }}>Back</button>
                    <div className="media-container">
                        {media.trailer ? (
                            <div className="video-wrapper">
                                <iframe
                                    width="900"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${media.trailer}`}
                                    title="YouTube video player"
                                    allowFullScreen
                                ></iframe>
                                <div className="media-title"><strong>{title}</strong></div>
                            </div>
                        ) : (
                            <div className="image-wrapper">
                                <img src={backdropUrl} alt={title || ''} className="media" />
                                <div className="media-title"><strong>{title}</strong></div>
                            </div>
                        )}
                        <div className="basic-details">
                            <h2>{title}</h2>
                            <p>
                                <strong>Genres:</strong> {media?.genres.map((genre: Genre) => genre.name).join(', ')}
                            </p>
                            <p><strong>Release Date:</strong> {releaseDate}</p>
                            <p><strong>Rating:</strong> {media.vote_average}</p>
                        </div>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>{media.overview}</p>
                    </div>
                </div>
            ) : (
                notFound &&
                <div>
                    <button className="back-button" onClick={() => { navigate(`/${activeTab}`) }}>Back</button>
                    <div className='not-found'>{mediaType} not found</div>
                </div>
            )}
        </div>
    );
};

export default MediaDetails;
