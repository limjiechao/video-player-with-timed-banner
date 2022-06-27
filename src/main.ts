import './index.css';
import { addBannerEventListeners } from './banner';
import {
  addPlayerEventListeners,
  setDurationDisplay,
  setTimelineMarker,
} from './player';
import { videoOuterContainer } from './elements';
import {
  disableVolumeSliderTransitionForMacosSafari,
  removeVolumeButtonIfIosSafari,
} from './player.helpers';

const disableVideoContextMenu = () => {
  videoOuterContainer.oncontextmenu = () => false;
};

document.addEventListener('readystatechange', () => {
  // NOTE: Disable menu when right-clicking
  disableVideoContextMenu();

  // NOTE: Adjustments for macOS Safari
  disableVolumeSliderTransitionForMacosSafari();
  // NOTE: Adjustments for iOS Safari
  removeVolumeButtonIfIosSafari();

  void setDurationDisplay();
  void setTimelineMarker();

  addBannerEventListeners();
  addPlayerEventListeners();
});
