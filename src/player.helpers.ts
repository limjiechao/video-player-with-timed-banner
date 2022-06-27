import {
  fullScreenEnterIcon,
  fullScreenExitIcon,
  pauseIcon,
  playIcon,
  video,
  videoOuterContainer,
  volumeOffIcon,
  volumeOnIcon,
  volumeSlider,
} from './elements';

export const disableVolumeSliderTransitionForSafari = () => {
  const isSafariBrowser =
    navigator.userAgent.indexOf('Safari') > -1 &&
    navigator.userAgent.indexOf('Chrome') <= -1;

  if (isSafariBrowser) {
    volumeSlider.classList.add('safari');
  }
};

export const getVideoDuration = async () => {
  return video.duration
    ? video.duration
    : await new Promise<number>((resolve) => {
        const setVideoDurationAndRemoveEventListener = () => {
          video.removeEventListener(
            'loadedmetadata',
            setVideoDurationAndRemoveEventListener
          );
          resolve(video.duration);
        };

        video.addEventListener(
          'loadedmetadata',
          setVideoDurationAndRemoveEventListener
        );
      });
};

export const createDebouncer = (delay = 2000) => {
  let timeoutId: number;

  return (task: () => void) =>
    new Promise<void>((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        task();
        resolve();
      }, delay);
    });
};

export const playOrPauseVideo = () => {
  switch (video.paused) {
    case true: {
      void video.play();
      break;
    }
    case false: {
      video.pause();
      break;
    }
  }
};

export const toggleBetweenPlayAndPauseIcon = () => {
  switch (video.paused) {
    case true: {
      pauseIcon.classList.remove('visible');
      playIcon.classList.add('visible');
      break;
    }
    case false: {
      playIcon.classList.remove('visible');
      pauseIcon.classList.add('visible');
      break;
    }
  }
};

const volumeButtonState = {
  _showVolumeSlider: 'hide' as 'show' | 'hide',
  get value() {
    return this._showVolumeSlider;
  },
  set value(showOrHide) {
    this._showVolumeSlider = showOrHide;
  },
  toggle() {
    this.value = this._showVolumeSlider === 'show' ? 'hide' : 'show';
  },
};

export const toggleVolumeButton = () => {
  volumeButtonState.toggle();
};

export const hideVolumeButton = () => {
  volumeButtonState.value = 'hide';
};

export const showOrHideVolumeSlider = () => {
  switch (volumeButtonState.value) {
    case 'show': {
      volumeSlider.classList.add('visible');
      break;
    }
    case 'hide': {
      volumeSlider.classList.remove('visible');
      break;
    }
  }
};

export const toggleVolumeIcon = (acceptedVolumeInput: number) => {
  if (acceptedVolumeInput === 0) {
    volumeOffIcon.classList.add('visible');
    volumeOnIcon.classList.remove('visible');
  } else {
    volumeOnIcon.classList.add('visible');
    volumeOffIcon.classList.remove('visible');
  }
};

export const padToTwoDigits = (time: number) => String(time).padStart(2, '0');

export const formatDisplayTime = (time: number) => {
  const seconds = Math.floor(time);
  const secondDisplay = seconds % 60;
  const minutes = (seconds - secondDisplay) / 60;
  const minuteDisplay = minutes % 60;
  const hourDisplay = (minutes - minuteDisplay) / 60;

  if ([seconds, minutes, hourDisplay].every(Number.isNaN)) {
    return `0:00`;
  }

  if (hourDisplay) {
    return `${padToTwoDigits(hourDisplay)}:${padToTwoDigits(
      minuteDisplay
    )}:${padToTwoDigits(secondDisplay)}`;
  }

  return `${minuteDisplay}:${padToTwoDigits(secondDisplay)}`;
};

export const toggleBetweenEnterAndExitFullScreenIcon = (
  isFullScreen: boolean
) => {
  switch (isFullScreen) {
    case true: {
      fullScreenExitIcon.classList.add('visible');
      fullScreenEnterIcon.classList.remove('visible');
      break;
    }
    case false: {
      fullScreenEnterIcon.classList.add('visible');
      fullScreenExitIcon.classList.remove('visible');
      break;
    }
  }
};

export const toggleFullScreen = (isFullScreen: boolean) => {
  switch (isFullScreen) {
    case true: {
      const exitFullScreen =
        document.exitFullscreen ||
        // NOTE: Support for Safari
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (document.webkitExitFullscreen as () => Promise<void>);

      // REF: https://www.reddit.com/r/learnjavascript/comments/6tdsqf/comment/dlkce0r/
      void exitFullScreen.call(document);
      break;
    }
    case false: {
      const requestFullScreen =
        videoOuterContainer.requestFullscreen ||
        // NOTE: Support for Safari
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (videoOuterContainer.webkitRequestFullscreen as () => Promise<void>);

      console.log(requestFullScreen);
      // REF: https://www.reddit.com/r/learnjavascript/comments/6tdsqf/comment/dlkce0r/
      void requestFullScreen.call(videoOuterContainer);
      break;
    }
  }
};
