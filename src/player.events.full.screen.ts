import { video } from './elements';
import {
  toggleBetweenEnterAndExitFullScreenIcon,
  toggleFullScreen,
} from './player.events.helpers';

export const enterOrExitFullScreen = (event: Event) => {
  event.stopPropagation();

  const fullScreenElement =
    document.fullscreenElement ||
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.webkitFullscreenElement ||
    // NOTE: This allows us to know if video is full screen on iOS Safari
    video.classList.contains('ios-safari-full-screen')
      ? video
      : null;

  const isFullScreen = !Object.is(fullScreenElement, null);

  toggleFullScreen(isFullScreen);
};

// NOTE: Toggling of enter/exit full screen icon must be decoupled from clicking of the full screen button
// NOTE: This is between user can exit full screen by pressing Escape
export const setEnterOrExitFullScreenIcon = () => {
  const isFullScreen = !Object.is(document.fullscreenElement, null);

  toggleBetweenEnterAndExitFullScreenIcon(isFullScreen);
};
