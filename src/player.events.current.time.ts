import { currentTimeDisplay, video } from './elements';
import { formatDisplayTime } from './player.events.helpers';

export const updateCurrentTimeDisplay = () => {
  currentTimeDisplay.innerText = formatDisplayTime(video.currentTime);
};
