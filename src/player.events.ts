import './player.css';
import {
  fullScreenButton,
  overlayPlayButton,
  playButton,
  timelineSlider,
  video,
  videoOuterContainer,
  volumeSlider,
  volumeToggle,
} from './elements';
import {
  hidePlayerOnMouseOut,
  showOrHidePlayerOnTouchend,
  showPlayerOnMouseMove,
} from './player.events.transitions';
import {
  playVideoAndHideOverlay,
  toggleBetweenPlayAndPauseIcon,
  toggleBetweenPlayAndStop,
} from './player.events.play.buttons';
import { adjustVolume, toggleVolumeSlider } from './player.volume.inputs';
import {
  setVideoCurrentTime,
  updateTimelineSliderPosition,
} from './player.events.timeline';
import {
  enterOrExitFullScreen,
  setEnterOrExitFullScreenIcon,
} from './player.events.full.screen';
import { updateCurrentTimeDisplay } from './player.events.current.time';

export const addPlayerEventListeners = () => {
  // NOTE: Player interface fade in/out
  videoOuterContainer.addEventListener('mousemove', showPlayerOnMouseMove);
  videoOuterContainer.addEventListener('mouseout', hidePlayerOnMouseOut);
  videoOuterContainer.addEventListener('touchend', showOrHidePlayerOnTouchend);

  // NOTE: Timeline slider
  timelineSlider.addEventListener('input', setVideoCurrentTime);
  video.addEventListener('timeupdate', updateTimelineSliderPosition);

  // NOTE: Overlay play button
  overlayPlayButton.addEventListener('click', playVideoAndHideOverlay);
  // NOTE: Player interface play button
  playButton.addEventListener('click', toggleBetweenPlayAndStop);
  video.addEventListener('ended', toggleBetweenPlayAndPauseIcon);

  // NOTE: Volume toggle and slider
  volumeToggle.addEventListener('click', toggleVolumeSlider);
  volumeSlider.addEventListener('input', adjustVolume);

  // NOTE: Video current time
  video.addEventListener('timeupdate', updateCurrentTimeDisplay);

  // NOTE: Full screen toggle and button icon update
  fullScreenButton.addEventListener('click', enterOrExitFullScreen);
  videoOuterContainer.addEventListener(
    'fullscreenchange',
    setEnterOrExitFullScreenIcon
  );
};
