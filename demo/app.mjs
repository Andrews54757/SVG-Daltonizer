import { DaltonizerTypes, SVGDaltonizer } from "../SVGDaltonizer.mjs";

const filechooser = document.getElementById('filechooser');
const cvdType = document.getElementById('cvdType');
const simulate = document.getElementById('simulate');
const strength = document.getElementById('strength');

const inputImage = document.getElementById('image-original');
const outputImage = document.getElementById('image-output');
const svgFilterOutput = document.getElementById('svgFilter');
const machado = document.getElementById('machado');

filechooser.addEventListener('change', () => {
    const file = filechooser.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        inputImage.src = reader.result;
        outputImage.src = reader.result;
    };
    reader.readAsDataURL(file);
});

let lastSVG;
function update() {
    outputImage.style.filter = '';
    if (lastSVG) {
        try {
            document.body.removeChild(lastSVG);
        } catch (e) {
            console.error(e);
        }
        lastSVG = null;
    }

    const type = parseInt(cvdType.value);
    const strengthValue = parseFloat(strength.value);
    const useMachado = machado.checked;
    if (type === -1 || strengthValue === 0) {
        return;
    }

    let svgobj;
    if (simulate.checked) {
        svgobj = SVGDaltonizer.makeCVDSimulatorFilter(type, strengthValue, useMachado);
        svgobj.filter.id = 'simulate-' + type + '-' + strengthValue;
    } else {
        svgobj = SVGDaltonizer.makeLMSDaltonizerFilter(type, strengthValue, useMachado);
        svgobj.filter.id = 'daltonize-' + type + '-' + strengthValue;
    }

    svgobj.svg.style.position = 'fixed';
    svgobj.svg.style.height = '0px';
    
    outputImage.style.filter = `url(#${svgobj.filter.id})`;

    document.body.appendChild(svgobj.svg);
    lastSVG = svgobj.svg;

    svgFilterOutput.textContent = svgobj.svg.outerHTML;
}

cvdType.addEventListener('change', update);
simulate.addEventListener('change', update);
machado.addEventListener('change', update);
strength.addEventListener('input', update);

update();