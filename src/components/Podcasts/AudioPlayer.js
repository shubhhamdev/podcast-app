import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaForward, FaBackward } from "react-icons/fa"

function AudioPlayer({ audioSrc, image }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const [duration, setDuration] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef();

    const handleDuration = (e) => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value
    };

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    const toggleMute = () => {
        if (isMute) {
            setIsMute(false);
        } else {
            setIsMute(true);
        }
    }

    const handleVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    }

    const handleSkipForward = () => {
        audioRef.current.currentTime += 10;
    }

    const handleSkipBackward = () => {
        audioRef.current.currentTime -= 10;
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetaData);
        audio.addEventListener("ended", handleEnded);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetaData);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handleLoadedMetaData = () => {
        setDuration(audioRef.current.duration);
    }

    const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false)
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isMute) {
            audioRef.current.muted = true;
            // audioRef.current.volume = volume;
            setVolume(0);
        } else {
            audioRef.current.muted = false;
            // audioRef.current.volume = 0;
            setVolume(1)
        }
    }, [isMute]);


    return (
        <div className='custom-audio-player'>
            <span id='controls'>
                <img src={image} alt="Album Cover" className='display-image-player' />
                <audio ref={audioRef} src={audioSrc} />
                <p className='audio-btn' onClick={handleSkipBackward}><FaBackward /></p>
                <p className='audio-btn' onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
                <p className='audio-btn' onClick={handleSkipForward}><FaForward /></p>
                <span className='volume'>
                    <p className='audio-btn' onClick={toggleMute}>{!isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
                    <input type='range' value={volume} max={1} min={0} step=".001" onChange={handleVolume} className='volume-range' />
                </span>
            </span>
            <div className='duration-flex'>
                <span className='time'>
                    <p>{formatTime(currentTime)}</p>
                    <input type='range' max={duration} value={currentTime} step={0.01} onChange={handleDuration} className='duration-range' />
                    <p>{formatTime(duration - currentTime)}</p>
                </span>
            </div>
        </div>
    )
}

export default AudioPlayer