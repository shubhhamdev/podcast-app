import React from 'react';
import "./PodcastCard.css"
import { NavLink } from 'react-router-dom';
import { FaCirclePlay } from "react-icons/fa6";

const PodcastCard = ({ id, title, displayImage}) => {
  return (
    <div>
      <NavLink to={`/podcast/${id}`}>
          <div className="podcast-card">
            <img className='display-image-podcast' src={displayImage}  />
            <div className='title-podcast'>
            <p>{title}</p>
            <p><FaCirclePlay /></p>
            </div>
          </div>
      </NavLink>
    </div>
  );
}

export default PodcastCard;
