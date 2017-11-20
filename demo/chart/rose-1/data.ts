export const data = [
  { area: '亚太地区', profit: 7860 * 0.189 },
  { area: '非洲及中东', profit: 7860 * 0.42 },
  { area: '拉丁美洲', profit: 7860 * 0.25 },
  { area: '中欧和东欧', profit: 7860 * 0.18 },
  { area: '西欧', profit: 7860 * 0.462 },
  { area: '北美', profit: 7860 * 0.265 },
];

export const dataPre= {
  transform: [
    { type: 'sort-by', field: 'profit' }
  ],
};

export const dataDef = [
  {
    dataKey: 'area',
    mark: ['column', 'color'],
    scale: {},
  }, {
    dataKey: 'profit',
    mark: 'row',
    scale: {},
  }
];
