# Solution

## Browser Compatibility

This video player should work in:

- desktop, i.e. macOS, Safari
- desktop Google Chrome
- desktop Mozilla Firefox
- iOS Safari and all WebKit-based browsers on iOS

I did not get to test it in browsers on Android as I do not have an Android device.

## Player Features

| **Feature/Browsers**                               | **Desktop Chrome, Firefox & Safari** | **iOS Safari & iOS WebKit-based browsers** |
|----------------------------------------------------|--------------------------------------|--------------------------------------------|
| **Video (inline)**                                 | Y                                    | Y                                          |
| **Video (full screen)**                            | Y                                    | Y [^1]                                     |
| **Custom player (inline)**                         | Y                                    | Y                                          |
| **Custom player (full screen)**                    | Y                                    | N [^2]                                     |
| **Custom player fading transitions (inline)**      | Y                                    | Y                                          |
| **Custom player fading transitions (full screen)** | Y                                    | N [^2]                                     |
| **Banner (inline)**                                | Y                                    | Y                                          |
| **Banner (full screen)**                           | Y                                    | N [^2], [^6]                               |
| **Volume level adjustment**                        | Y                                    | N [^3], [^6]                               |
| **Volume slider fading transition (inline)**       | N [^4]                               | N [^3]                                     |
| **Volume mute/unmute (inline)**                    | Y                                    | N [^3], [^6]                               |
| **Volume mute/unmute (full screen)**               | Y                                    | Y [^5], [^6]                               |
| **Timeline slider**                                | Y                                    | Y [^5]                                     |
| **Custom player play button**                      | Y                                    | Y [^5]                                     |
| **Overlay play button (inline)**                   | Y                                    | Y [^5]                                     |
| **Overlay play button (full screen)**              | Y                                    | N                                          |

[^1]: This is possible because iOS WebKit does support full screen on HTML `<video>` element via vendor-prefixed methods. 
[^2]: This is because iOS WebKit does not support full screen for HTML `<div>` element.
[^3]: Volume control is hidden because iOS WebKit does not support volume adjustment.
[^4]: No fading transition in Safari because range input continues to take up width even when CSS `-webkit-appeartance: none; appearance: none` is set.
[^5]: This is available via the browser default HTML video player interface.  
[^6]: This is on par with YouTube on the mobile web.
