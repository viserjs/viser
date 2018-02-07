import { Chart, Tooltip, Axis, Point, Legend, Guide } from '../../../packages/viser-react/src/index';
import * as React from 'react';
const DataSet = require('@antv/data-set');

const sourceData = [{
  State: 'AL',
  'Under 5 Years': 310504,
  '5 to 13 Years': 552339,
  '14 to 17 Years': 259034,
  '18 to 24 Years': 450818,
  '25 to 44 Years': 1231572,
  '45 to 64 Years': 1215966,
  '65 Years and Over': 641667
}, {
  State: 'AK',
  'Under 5 Years': 52083,
  '5 to 13 Years': 85640,
  '14 to 17 Years': 42153,
  '18 to 24 Years': 74257,
  '25 to 44 Years': 198724,
  '45 to 64 Years': 183159,
  '65 Years and Over': 50277
}, {
  State: 'AZ',
  'Under 5 Years': 515910,
  '5 to 13 Years': 828669,
  '14 to 17 Years': 362642,
  '18 to 24 Years': 601943,
  '25 to 44 Years': 1804762,
  '45 to 64 Years': 1523681,
  '65 Years and Over': 862573
}, {
  State: 'AR',
  'Under 5 Years': 202070,
  '5 to 13 Years': 343207,
  '14 to 17 Years': 157204,
  '18 to 24 Years': 264160,
  '25 to 44 Years': 754420,
  '45 to 64 Years': 727124,
  '65 Years and Over': 407205
}, {
  State: 'CA',
  'Under 5 Years': 2704659,
  '5 to 13 Years': 4499890,
  '14 to 17 Years': 2159981,
  '18 to 24 Years': 3853788,
  '25 to 44 Years': 10604510,
  '45 to 64 Years': 8819342,
  '65 Years and Over': 4114496
}, {
  State: 'CO',
  'Under 5 Years': 358280,
  '5 to 13 Years': 587154,
  '14 to 17 Years': 261701,
  '18 to 24 Years': 466194,
  '25 to 44 Years': 1464939,
  '45 to 64 Years': 1290094,
  '65 Years and Over': 511094
}, {
  State: 'CT',
  'Under 5 Years': 211637,
  '5 to 13 Years': 403658,
  '14 to 17 Years': 196918,
  '18 to 24 Years': 325110,
  '25 to 44 Years': 916955,
  '45 to 64 Years': 968967,
  '65 Years and Over': 478007
}];
const ages = [
  'Under 5 Years', '5 to 13 Years', '14 to 17 Years',
  '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ages,
  key: 'name'
}).transform({
  type: 'waffle',
  maxCount: 500,
  groupBy: 'State'
});
const data = dv.rows;

const guideDv = new DataSet.View().source(dv);
guideDv.transform({
  type: 'aggregate',
  fields: ['y'],
  operations: ['median'],
  as: ['medianY'],
  groupBy: 'State'
});
const guideData = guideDv.rows;

const scale = [
  { dataKey: 'x', nice: false },
  { dataKey: 'y', nice: false },
];


export default class App extends React.Component {
  render() {
    return (
      <Chart forceFit height={440} data={data} scale={scale} padding={[20, 20, 120, 50]}>
        <Tooltip />
        <Legend dataKey="name" position="bottom" />
        <Legend dataKey="_hStep" show={false} />
        <Legend dataKey="_wStep" show={false} />
        <Point
          shape="square"
          position="x*y"
          color="name"
          size={['_hStep', hStep => Math.min(90 * hStep, 5)]}
        />
        {
          guideData.map((row: any, i: number) => {
            return (
              <Guide
                key={`guide-text-${i}`}
                type="text"
                top={true}
                position={[0, row.medianY]}
                content={row.State}
                offsetX={-10}
                style={{
                  fill: '#666',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}
              />
            );
          })
        }
      </Chart>
    );
  }
}

