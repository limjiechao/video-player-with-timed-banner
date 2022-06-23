import './index.css';
import { addBannerEventListeners } from './banner';
import {
  addPlayerEventListeners,
  setDurationDisplay,
  setTimelineMarker,
} from './player';
import { videoOuterContainer } from './elements';

const disableVideoContextMenu = () => {
  videoOuterContainer.oncontextmenu = () => false;
};

document.addEventListener('readystatechange', () => {
  disableVideoContextMenu();
  void setDurationDisplay();
  void setTimelineMarker();

  addBannerEventListeners();
  addPlayerEventListeners();
});
