import CircleProgress from './component/CircleProgress';
import Aqu from './component/Aqu';
import Ball from './component/Ball';

const circleCanvas = document.getElementById('progress-demo');
const aquCanvas = document.getElementById('aqu-demo');
const ballCanvas = document.getElementById('ball-demo');

new CircleProgress({
    canvas: circleCanvas
});

new Aqu({
    canvas: aquCanvas
});

new Ball({
    canvas: ballCanvas
});
