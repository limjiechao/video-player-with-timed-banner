import { player } from './elements';
import { createDebouncer } from './player.events.helpers';

const debounceOverlayFadeOut = createDebouncer();

export const showPlayerOnMouseMove = () => {
  if (!player.classList.contains('visible')) {
    player.classList.add('visible');
    void debounceOverlayFadeOut(() => player.classList.remove('visible'));
  }
};

export const hidePlayerOnMouseOut = () => {
  if (player.classList.contains('visible')) {
    void debounceOverlayFadeOut(() => player.classList.remove('visible'));
  }
};

export const showOrHidePlayerOnTouchend = () => {
  switch (player.classList.contains('visible')) {
    case true:
      void debounceOverlayFadeOut(() => player.classList.remove('visible'));
      break;
    case false:
      player.classList.add('visible');
      break;
  }
};
