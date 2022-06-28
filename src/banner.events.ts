import './banner.css';
import { banner, video } from './elements';

export const bannerDisplay = Object.freeze({
  start: 4,
  end: 60,
});

const bannerState = {
  _isShown: false,
  get isShown(): boolean {
    return this._isShown;
  },
  set isShown(isShown: boolean) {
    this._isShown = isShown;
  },
};

/* ==================== */
/* NOTE: Event handlers */
/* ==================== */

const showOrHideBanner = () => {
  const currentTimeEntersDisplayThreshold =
    video.currentTime >= bannerDisplay.start;
  const currentTimeExitsDisplayThreshold =
    Math.floor(video.currentTime) > bannerDisplay.end;
  const currentTimeIsWithinDisplayThreshold =
    currentTimeEntersDisplayThreshold && !currentTimeExitsDisplayThreshold;
  const currentTimeIsOutsideDisplayThreshold =
    !currentTimeIsWithinDisplayThreshold;

  if (currentTimeIsWithinDisplayThreshold && !bannerState.isShown) {
    bannerState.isShown = true;
    banner.classList.add('visible');
  }

  if (currentTimeIsOutsideDisplayThreshold && bannerState.isShown) {
    bannerState.isShown = false;
    banner.classList.remove('visible');
  }
};

export const addBannerEventListeners = () => {
  video.addEventListener('timeupdate', showOrHideBanner);
};
