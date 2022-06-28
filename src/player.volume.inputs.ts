import {
  createDebouncer,
  hideVolumeButton,
  showOrHideVolumeSlider,
  toggleVolumeButton,
  toggleVolumeIcon,
} from './player.events.helpers';
import { video } from './elements';

const debounceHideVolumeButton = createDebouncer();

const handleDebounceHideVolumeButton = () => {
  void debounceHideVolumeButton(() => {
    hideVolumeButton();
    showOrHideVolumeSlider();
  });
};

export const toggleVolumeSlider = (event: Event) => {
  event.stopPropagation();

  toggleVolumeButton();
  showOrHideVolumeSlider();

  handleDebounceHideVolumeButton();
};

export const adjustVolume = (event: Event) => {
  event.stopPropagation();

  const volumeInput = Number((event.currentTarget as HTMLInputElement).value);
  const acceptedVolumeInput = Number((volumeInput / 100).toPrecision(2));

  video.volume = acceptedVolumeInput;
  toggleVolumeIcon(acceptedVolumeInput);

  handleDebounceHideVolumeButton();
};
