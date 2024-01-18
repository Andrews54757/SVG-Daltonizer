# SVG-Daltonizer
Generate SVG filters for color vision deficiency simulation and correction. These filters can then be applied using CSS.

Developed for use in [FastStream](https://github.com/Andrews54757/FastStream), a browser extension for better video playback.

Available CVD types:
1. Protanomaly
2. Dueteranomaly
3. Tritanomaly

Uses the [LMS daltonization algorithm](http://www.daltonize.org/2010/05/lms-daltonization-algorithm.html).

## Usage

Demo available in `./demo/` [Live on Github Pages](https://andrews54757.github.io/SVG-Daltonizer/demo/). Use `SVGDaltonizer.mjs` to generate new svg filters.

```js
import { DaltonizerTypes, SVGDaltonizer } from "./SVGDaltonizer.mjs";

let svgobj;
let simulate = false;
let type = DaltonizerTypes.PROTANOMALY;
let strengthValue = 1.0;
if (simulate) {
    svgobj = SVGDaltonizer.makeCVDSimulatorFilter(type, strengthValue);
    svgobj.filter.id = 'simulate-' + type + '-' + strengthValue;
} else {
    svgobj = SVGDaltonizer.makeLMSDaltonizerFilter(type, strengthValue);
    svgobj.filter.id = 'daltonize-' + type + '-' + strengthValue;
}

targetElement.style.filter = `url(#${svgobj.filter.id})`;
document.head.appendChild(svgobj.svg);
```

Pregenerated SVG filters are also available in `./pregenerated/`

## Helpful Resources

http://www.daltonize.org/2010/05/lms-daltonization-algorithm.html

https://ixora.io/projects/colorblindness/color-blindness-simulation-research/

## License
Available for use under the MIT license. See LICENSE.md for more information.