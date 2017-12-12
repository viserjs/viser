import viser from '../../../packages/viser/src/index';
import { geoData, data } from './data';

const scale = [{
  dataKey: 'x',
  sync: true,
  nice: false,
}, {
  dataKey: 'y',
  sync: true,
  nice: false,
}];

const bgDataPre = {
  connector: {
    type: 'GeoJSON'
  },
  transform: {
    type: 'geo.projection',
    projection: 'geoMercator',
    as: ['x', 'y', 'centroidX', 'centroidY'],
  },
};

const userDataPre = (dv) => {
  const geo = dv['111'];
  return {
    transform: {
      type: 'map',
      callback: (obj) => {
        const projectedCoord = geo.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
        obj.x = projectedCoord[0];
        obj.y = projectedCoord[1];
        obj.deaths = obj.deaths * 1;
        obj.magnitude = obj.magnitude * 1;
        return obj;
      }
    },
  }
};

viser({
  scale,
  coord: {
    type: 'rect',
    direction: 'TL',
  },
  tooltip: {
    showTitle: false,
    containerTpl: '<div class="g2-tooltip">'
      + '<table class="g2-tooltip-list"></table></div>',
    itemTpl: '<tr data-index={index}><td style="padding: 5px; background-color:#545454">{name}</td><td style="padding: 5px; background-color:#fff;color: #000">{value}</td></tr>',
    g2Tooltip: {
      borderRadius: '2px',
      backgroundColor: '#DDDDDD',
      padding: 0,
      border: '1px solid #333'
    }
  },
  views: [{
    viewId: '111',
    data: geoData,
    dataPre: bgDataPre,
    tooltip: false,
    series: {
      quickType: 'polygon',
      position: 'x*y',
      style: {
        fill: '#DDDDDD',
        stroke: '#fff',
        lineWidth: 0.5,
        fillOpacity: 0.85,
      }
    }
  }, {
    viewId: '122',
    data: data,
    dataPre: userDataPre,
    series: {
      quickType: 'point',
      position: 'x*y',
      size: ['deaths', [2, 30]],
      opacity: 0.45,
      color: '#FF2F29',
      tooltip: 'date*location*lat*lng*deaths*magnitude',
    }
  }],
  chart: {
    container: 'mount',
    forceFit: true,
    height: 600,
    padding: [0, 20, 40],
  },
});
