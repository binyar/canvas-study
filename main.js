import CircleProgress from './component/CircleProgress';
import Aqu from './component/Aqu';
import Ball from './component/Ball';
import Ball3D from './component/Ball3D';

const circleCanvas = document.getElementById('progress-demo');
const aquCanvas = document.getElementById('aqu-demo');
const ballCanvas = document.getElementById('ball-demo');
const ball3dCanvas = document.getElementById('ball3d-demo');

new CircleProgress({
    canvas: circleCanvas
});

new Aqu({
    canvas: aquCanvas
});

new Ball({
    canvas: ballCanvas
});

new Ball3D({
    canvas: ball3dCanvas
})
