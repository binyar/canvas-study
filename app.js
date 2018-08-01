import {raf} from './base/base';

import CircleProgress from './component/CircleProgress';
import Aqu from './component/Aqu';
import Ball from './component/Ball';
import Ball3D from './component/Ball3D';
import Flower from './component/Flower';
import FlowerOcean from './component/FlowerOcean';
import Les from './component/Les';

import Sky from './component/Sky';
import Table from './component/Table';

raf();

switch (window.dpPage) {
    case 'index':
        const circleCanvas = document.getElementById('progress-demo');
        const aquCanvas = document.getElementById('aqu-demo');
        const ballCanvas = document.getElementById('ball-demo');
        const ball3dCanvas = document.getElementById('ball3d-demo');
        const flowerCanvas = document.getElementById('flower-demo');
        const flowerOceanCanvas = document.getElementById('flower-ocean-demo');
        const lesCanvas = document.getElementById('les-demo');

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
        });

        new Flower({
            canvas: flowerCanvas
        });

        new FlowerOcean({
            canvas: flowerOceanCanvas
        });

        new Les(({
            canvas: lesCanvas
        }));
        break;
    case 'sky':
        const skyCanvas = document.getElementById('sky-demo');
        skyCanvas.width = document.documentElement.clientWidth;
        skyCanvas.height = document.documentElement.clientHeight;
        new Sky({
            canvas: skyCanvas
        });
        break;
    case 'table':
        const tableCanvas = document.getElementById('table-demo');
        new Table(({
            canvas: tableCanvas
        }));
        break;
    default:
        break;
}
