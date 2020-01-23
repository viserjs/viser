interface IPosition {
  x?: number;
  y?: number;
}

export default interface IZoom {
  /** 是否相对于画布 */
  isCanvasRelative?: boolean;
  /** 当前 zoom */
  ratio: number;
  /** min max zoom */
  min?: number;
  max?: number;
  /** zoom 中心点 */
  center?: IPosition;
}
