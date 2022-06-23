import './player.css';
import {
  currentTimeDisplay,
  durationDisplay,
  fullScreenButton,
  overlay,
  overlayPlayButton,
  playButton,
  player,
  timelineSlider,
  timelineTrack,
  video,
  videoOuterContainer,
  volumeSlider,
  volumeToggle,
} from './elements';
import {
  createDebouncer,
  formatDisplayTime,
  getVideoDuration,
  playOrPauseVideo,
  showOrHideVolumeSlider,
  toggleBetweenEnterAndExitFullScreenIcon,
  toggleBetweenPlayAndPauseIcon,
  toggleFullScreen,
  toggleVolumeIcon,
  toggleVolumeButton,
  hideVolumeButton,
} from './player.helpers';
import { bannerDisplay } from './banner';

/* ============================= */
/* NOTE: One-off initializations */
/* ============================= */

export const setTimelineMarker = async () => {
  const videoDuration = await getVideoDuration();

  const timelineMarker = document.createElement('div');
  timelineMarker.classList.add('timeline-marker');
  const timelineMarkerWidth = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--timeline-marker-width'
    )
  );
  timelineMarker.style.left = `${
    (bannerDisplay.start / videoDuration) * timelineTrack.clientWidth +
    timelineMarkerWidth
  }px`;
  timelineTrack.prepend(timelineMarker);
};

export const setDurationDisplay = async () => {
  const videoDuration = await getVideoDuration();

  durationDisplay.innerText = formatDisplayTime(videoDuration);
};

/* ==================== */
/* NOTE: Event handlers */
/* ==================== */

const playVideoAndHideOverlay = () => {
  playOrPauseVideo();
  overlay.classList.remove('visible');
};

const debounceOverlayFadeOut = createDebouncer();

export const hidePlayerOnMouseOut = () => {
  if (player.classList.contains('visible')) {
    void debounceOverlayFadeOut(() => player.classList.remove('visible'));
  }
};

export const showPlayerOnMouseMove = () => {
  if (!player.classList.contains('visible')) {
    player.classList.add('visible');
    void debounceOverlayFadeOut(() => player.classList.remove('visible'));
  }
};

const showOrHidePlayerOnTouchend = () => {
  switch (player.classList.contains('visible')) {
    case true:
      void debounceOverlayFadeOut(() => player.classList.remove('visible'));
      break;
    case false:
      player.classList.add('visible');
      break;
  }
};

const updateTimelineSliderPosition = () => {
  timelineSlider.value = String(
    (video.currentTime / video.duration) * Number(timelineSlider.max)
  );
};

const setVideoCurrentTime = () => {
  video.currentTime =
    (Number(timelineSlider.value) / Number(timelineSlider.max)) *
    video.duration;
};

const toggleBetweenPlayAndStop = (event: Event) => {
  event.stopPropagation();

  playOrPauseVideo();
  overlay.classList.remove('visible');
  toggleBetweenPlayAndPauseIcon();
};

const debounceHideVolumeButton = createDebouncer();

const handleDebounceHideVolumeButton = () => {
  void debounceHideVolumeButton(() => {
    hideVolumeButton();
    showOrHideVolumeSlider();
  });
};

const toggleVolumeSlider = (event: Event) => {
  event.stopPropagation();

  toggleVolumeButton();
  showOrHideVolumeSlider();

  handleDebounceHideVolumeButton();
};

const adjustVolume = (event: Event) => {
  event.stopPropagation();

  const volumeInput = Number((event.currentTarget as HTMLInputElement).value);
  const acceptedVolumeInput = Number((volumeInput / 100).toPrecision(2));

  video.volume = acceptedVolumeInput;
  toggleVolumeIcon(acceptedVolumeInput);

  handleDebounceHideVolumeButton();
};

const updateCurrentTimeDisplay = () => {
  currentTimeDisplay.innerText = formatDisplayTime(video.currentTime);
};

const enterOrExitFullScreen = (event: Event) => {
  event.stopPropagation();

  // NOTE: Support for Safari
  const fullScreenElement =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.fullscreenElement || document.webkitFullscreenElement;

  const isFullScreen = !Object.is(fullScreenElement, null);

  toggleFullScreen(isFullScreen);
};

// NOTE: Toggling of enter/exit full screen icon must be decoupled from clicking of the full screen button
// NOTE: This is between user can exit full screen by pressing Escape
const setEnterOrExitFullScreenIcon = () => {
  const isFullScreen = !Object.is(document.fullscreenElement, null);

  toggleBetweenEnterAndExitFullScreenIcon(isFullScreen);
};

export const addPlayerEventListeners = () => {
  // NOTE: Overlay play button
  overlayPlayButton.addEventListener('click', playVideoAndHideOverlay);

  // NOTE: Player interface fade in/out
  videoOuterContainer.addEventListener('mousemove', showPlayerOnMouseMove);
  videoOuterContainer.addEventListener('mouseout', hidePlayerOnMouseOut);
  videoOuterContainer.addEventListener('touchend', showOrHidePlayerOnTouchend);

  // NOTE: Timeline slider
  timelineSlider.addEventListener('input', setVideoCurrentTime);
  video.addEventListener('timeupdate', updateTimelineSliderPosition);

  // NOTE: Play button
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
