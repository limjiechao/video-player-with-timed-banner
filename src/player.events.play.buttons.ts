import { playOrPauseVideo } from './player.events.helpers';
import { overlay, pauseIcon, playIcon, video } from './elements';

export const toggleBetweenPlayAndPauseIcon = () => {
  switch (video.paused) {
    case true: {
      pauseIcon.classList.remove('visible');
      playIcon.classList.add('visible');
      break;
    }
    case false: {
      playIcon.classList.remove('visible');
      pauseIcon.classList.add('visible');
      break;
    }
  }
};

export const playVideoAndHideOverlay = () => {
  playOrPauseVideo();
  overlay.classList.remove('visible');
  toggleBetweenPlayAndPauseIcon();
};

export const toggleBetweenPlayAndStop = (event: Event) => {
  event.stopPropagation();

  playOrPauseVideo();
  overlay.classList.remove('visible');
  toggleBetweenPlayAndPauseIcon();
};
