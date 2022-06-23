/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const overlay = document.querySelector<HTMLDivElement>('#overlay')!;

export const overlayPlayButton = document.querySelector<SVGElement>(
  '#overlay-play-button'
)!;

export const videoOuterContainer = document.querySelector<HTMLDivElement>(
  '#video-outer-container'
)!;

export const video = document.querySelector<HTMLVideoElement>('#video')!;

export const banner = document.querySelector<HTMLImageElement>('#banner')!;

export const player = document.querySelector<HTMLDivElement>('#player')!;

export const timelineTrack =
  document.querySelector<HTMLDivElement>('#timeline-track')!;

export const timelineSlider =
  document.querySelector<HTMLInputElement>('#timeline-slider')!;

export const playButton =
  document.querySelector<HTMLButtonElement>('#play-button')!;

export const playIcon = document.querySelector<SVGElement>('#play-icon')!;

export const pauseIcon = document.querySelector<SVGElement>('#pause-icon')!;

export const volumeButton =
  document.querySelector<HTMLDivElement>('#volume-button')!;

export const volumeToggle =
  document.querySelector<HTMLButtonElement>('#volume-toggle')!;

export const volumeOnIcon =
  document.querySelector<SVGElement>('#volume-on-icon')!;

export const volumeOffIcon =
  document.querySelector<SVGElement>('#volume-off-icon')!;

export const volumeSlider =
  document.querySelector<HTMLInputElement>('#volume-slider')!;

export const currentTimeDisplay = document.querySelector<HTMLSpanElement>(
  '#current-time-display'
)!;

export const durationDisplay =
  document.querySelector<HTMLSpanElement>('#duration-display')!;

export const fullScreenButton = document.querySelector<HTMLButtonElement>(
  '#full-screen-button'
)!;

export const fullScreenEnterIcon = document.querySelector<SVGElement>(
  '#full-screen-enter-icon'
)!;

export const fullScreenExitIcon = document.querySelector<SVGElement>(
  '#full-screen-exit-icon'
)!;
