import './index.css';
import { addBannerEventListeners } from './banner';
import {
  addPlayerEventListeners,
  setDurationDisplay,
  setTimelineMarker,
} from './player';
import { videoOuterContainer } from './elements';
import { disableVolumeSliderTransitionForSafari } from './player.helpers';

const disableVideoContextMenu = () => {
  videoOuterContainer.oncontextmenu = () => false;
};

document.addEventListener('readystatechange', () => {
  disableVideoContextMenu();
  disableVolumeSliderTransitionForSafari();
  void setDurationDisplay();
  void setTimelineMarker();

  addBannerEventListeners();
  addPlayerEventListeners();
});
