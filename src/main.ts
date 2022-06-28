import './index.css';
import { addBannerEventListeners } from './banner.events';
import { addPlayerEventListeners } from './player.events';
import {
  disableVolumeSliderTransitionForMacosSafari,
  removeVolumeButtonIfIosSafari,
} from './player.events.helpers';
import {
  disableVideoContextMenu,
  removePresetVideoDimensions,
  setDurationDisplay,
  setTimelineMarker,
} from './player.initializations';

document.addEventListener('readystatechange', () => {
  // NOTE: Remove preset video dimensions once video metadata is loaded
  removePresetVideoDimensions();
  // NOTE: Disable menu when right-clicking
  disableVideoContextMenu();
  // NOTE: Adjustments for macOS Safari
  disableVolumeSliderTransitionForMacosSafari();
  // NOTE: Adjustments for iOS Safari
  removeVolumeButtonIfIosSafari();
  // NOTE: Set total duration of video
  void setDurationDisplay();
  // NOTE: Set the advertisement marker on the timezone
  void setTimelineMarker();

  addBannerEventListeners();
  addPlayerEventListeners();
});
