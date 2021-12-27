import React, { useState, useRef, useEffect } from "react";
import trankList from "./trank-list";
import AudioControl from "./audio-controls";
import "./index.css";
import Backdrop from "./Backdrop";
import { flatten } from "../../utils/index";

const AudioPlayer = () => {
  const [trankIndex, setTrankIndex] = useState(0);
  const [trankProgress, setTranlProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artisk, audiosrc, image, color } = trankList[trankIndex];

  //   player Ref
  const audioRef = useRef(new Audio(audiosrc));
  const isReady = useRef(false);
  const intervalRef = useRef<any>();
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trankProgress / duration) * 100}%`
    : "0%";

  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      //   更新时间
      startTime();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audiosrc);
    setTranlProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [trankIndex]);

  useEffect(() => {
    const arr = [1, 2, [3, 4, [5, 6]]];
    console.log([...flatten(arr)]);
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTime = () => {
    //   清楚定时器
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onNextClick();
      } else {
        setTranlProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onNextClick = () => {
    if (trankIndex < trankList.length - 1) {
      setTrankIndex(trankIndex + 1);
    } else {
      setTrankIndex(0);
    }
  };

  const onPrevClick = () => {
    if (trankIndex - 1 < 0) {
      setTrankIndex(trankList.length - 1);
    } else {
      setTrankIndex(trankIndex - 1);
    }
  };

  const rangeChange = (value: string) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value);
    setTranlProgress(audioRef.current.currentTime);
  };

  return (
    <div className={`player-container`}>
      <div>
        <img className={`player-img`} src={image} alt="图片" />
        <h2 className={`player-title`}>{title}</h2>
        <h3 className={`player-artisk`}>{artisk}</h3>
        <AudioControl
          isPlaying={isPlaying}
          onNextClick={onNextClick}
          onPlayPauseClick={setIsPlaying}
          onPrevClick={onPrevClick}
        />
        <input
          type="range"
          value={trankProgress}
          step={1}
          min={0}
          max={duration ? duration : `${duration}`}
          onChange={(e) => rangeChange(e.target.value)}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop isPlaying={isPlaying} trankIndex={trankIndex} color={color} />
    </div>
  );
};

export default AudioPlayer;
