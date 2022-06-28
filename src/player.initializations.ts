import { formatDisplayTime, getVideoDuration } from './player.events.helpers';
import { bannerDisplay } from './banner.events';
import {
  durationDisplay,
  timelineTrack,
  video,
  videoOuterContainer,
} from './elements';

/* ============================= */
/* NOTE: One-off initializations */
/* ============================= */

export const removePresetVideoDimensions = () => {
  if (video.height && video.width) {
    video.removeAttribute('height');
    video.removeAttribute('width');
    video.classList.add('full-width');
  }

  const removeVideoDimensionAttributes = () => {
    video.removeEventListener('loadedmetadata', removeVideoDimensionAttributes);
  };

  video.addEventListener('loadedmetadata', removeVideoDimensionAttributes);
};

export const disableVideoContextMenu = () => {
  videoOuterContainer.oncontextmenu = () => false;
};

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
