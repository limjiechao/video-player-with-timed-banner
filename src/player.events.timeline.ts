import { timelineSlider, video } from './elements';

export const updateTimelineSliderPosition = () => {
  timelineSlider.value = String(
    (video.currentTime / video.duration) * Number(timelineSlider.max)
  );
};

export const setVideoCurrentTime = () => {
  video.currentTime =
    (Number(timelineSlider.value) / Number(timelineSlider.max)) *
    video.duration;
};
