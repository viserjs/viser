import * as _ from 'lodash';
import IDataPreConfig from '../typed/IDataPre';

const DataSet = require('@antv/data-set');

class CommonDataSet {
  dataSet: any = {};
  ds: any;

  constructor() {
    this.ds = new DataSet();
  }

  public copyData(viewId: string, copyId: string) {
    this.setDataSet(this.dataSet[viewId], copyId);
    return this.dataSet[viewId];
  }

  public getProcessedData(data: any, dataPre: IDataPreConfig, viewId: string) {
    let cData = _.cloneDeep(data);
    let cDataPre = _.isFunction ? dataPre : _.cloneDeep(dataPre);

    let currData: any;
    if (viewId && this.dataSet[viewId]) { return; }

    if (_.isEmpty(cData)) {
      currData = [];
      this.setDataSet(currData, viewId);
      return currData;
    }

    if (_.isFunction(cDataPre)) { cDataPre = cDataPre(this.dataSet); }

    if (_.isEmpty(cDataPre) || _.isEmpty(cDataPre.transform)) {
      currData = this.createSource(cData, cDataPre);
      this.setDataSet(currData, viewId);
      return currData;
    }

    cDataPre.transform = Array.isArray(cDataPre.transform) ? cDataPre.transform : [cDataPre.transform];
    let transform = cDataPre.transform as any;

    // basic exchange row and colmun
    if (transform && transform.length) {
      const exchangeType = transform[0].exchangeType;
      if (exchangeType === 'type-1') {
        cData = this.processExchangeColumnToRowOne(cData, transform[0]);
      } else if (exchangeType === 'type-2') {
        cData = this.processExchangeColumnToRowTwo(cData, transform[0]);
      } else if (exchangeType === 'type-3') {
        cData = this.processExchangeColumnToRowThree(cData, transform[0]);
      }
    }

    let dv = this.createSource(cData, cDataPre);

    let ds;
    for (const item of transform) {
      if (item.exchangeType) { continue; }
      ds = this.processCommonTransform(dv, item);
    }

    currData = ds;
    this.setDataSet(currData, viewId);
    return currData;
  }

  public getDataView(data: any, dataView: string = 'rows') {
    if (_.isArray(dataView) && dataView.length >= 2) {
      const type = dataView[0];

      if (_.isFunction(dataView[1])) {
        if (type === 'nodes') {
          return dataView[1](data.getAllNodes());
        } else if (type === 'edges') {
          return dataView[1](data.getAllLinks());
        }
      }
    }

    return data[dataView];
  }

  private setDataSet(data: any, viewId: string) {
    if (viewId) {
      this.dataSet[viewId] = data;
    }
  }

  private transformData(data: any, dataPre: IDataPreConfig) {
    dataPre.transform = Array.isArray(dataPre.transform) ? dataPre.transform : [dataPre.transform];
    let transform = dataPre.transform as any;

    // basic exchange row and colmun
    if (transform && transform.length) {
      const exchangeType = transform[0].exchangeType;
      if (exchangeType === 'type-1') {
        data = this.processExchangeColumnToRowOne(data, transform[0]);
      } else if (exchangeType === 'type-2') {
        data = this.processExchangeColumnToRowTwo(data, transform[0]);
      } else if (exchangeType === 'type-3') {
        data = this.processExchangeColumnToRowThree(data, transform[0]);
      }
    }

    let dv = this.createSource(data, dataPre);

    let ds;
    for (const item of transform) {
      if (item.exchangeType) { continue; }
      ds = this.processCommonTransform(dv, item);
    }
  }

  private handleToNumber(row: any, def: any) {
    const fields = Array.isArray(def.fields) ? def.fields : [def.fields];

    for (const item of fields) {
      row[item] = parseFloat(row[item]);
    }

    return row;
  }

  // exchage column merge to arry
  // [
  //   { x: 1, y: 1, z: 1 },
  //   { x: 2, y: 2, z: 2 },
  // ]
  // merge x, y to
  // [
  //   { xy: [1, 1], z: 1 }
  //   { xy: [2, 2], z: 2 }
  // ]
  private handleMergeFields(row: any, item: any) {
    const fields = item.fields;

    if (!Array.isArray(fields) || fields.length === 0) {
      throw new Error(`The merge fields of DataPre must be greater than 0.`);
    }

    const newItem = [];
    for (const field of fields) {
      newItem.push(row[field]);
    }

    row[item.as] = newItem;

    return row;
  }

  // exchage column to row
  // fields appointed the key of exchange
  // {
  //   x: [1, 2, 3],
  //   y: [1, 2, 3],
  // }
  // to
  // [
  //   { x: 1, y: 1 }
  //   { x: 2, y: 2 }
  //   { x: 3, y: 3 }
  // ]
  private processExchangeColumnToRowOne(data: any, item: any) {
    const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
    const finalData: any = [];

    for (const res in data) {
      if (data.hasOwnProperty(res) && itemArr.indexOf(res) >= 0) {
        for (let i = 0; i < data[res].length; i++) {
          if (!finalData[i]) { finalData[i] = {}; }
          if (data[res][i]) { finalData[i][res] = data[res][i]; }
        }
      }
    }

    return finalData;
  }

  // exchage column to row
  // fields appointed the key of exchange
  // [
  //   ['x', 1, 2, 3],
  //   ['y', 1, 2, 3],
  // ]
  // to
  // [
  //   { x: 1, y: 1 }
  //   { x: 2, y: 2 }
  //   { x: 3, y: 3 }
  // ]
  private processExchangeColumnToRowTwo(data: any, item: any) {
    const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
    const finalData: any = [];

    for (const res of data) {
      const key = res[0];

      if (itemArr.indexOf(key) >= 0) {
        for (let i = 1; i < res.length; i++) {
          if (!finalData[i - 1]) { finalData[i - 1] = {}; }
          if (res[i]) { finalData[i - 1][key] = res[i]; }
        }
      }
    }

    return finalData;
  }

  // exchage column to row
  // fields appointed the key of exchange
  // [
  //   [1, 2, 3],
  //   [1, 2, 3],
  // ]
  // to
  // [
  //   { x: 1, y: 1 }
  //   { x: 2, y: 2 }
  //   { x: 3, y: 3 }
  // ]
  private processExchangeColumnToRowThree(data: any, item: any) {
    const itemArr = Array.isArray(item.fields) ? item.fields : [item.fields];
    const finalData: any = [];
    let i = 0;

    for (const res of data) {
      const key = itemArr[i];

      for (let i = 0; i < res.length; i++) {
        if (!finalData[i]) { finalData[i] = {}; }
        if (res[i]) { finalData[i][key] = res[i]; }
      }
      i++;
    }

    return finalData;
  }

  private processCommonTransform(dv: any, item: any) {
    if (item.type === 'toNumber') {
      dv = dv.transform({
        type: 'map',
        callback: (row: any) => {
          return this.handleToNumber(row, item);
        }
      });
    } else if (item.type === 'merge') {
      dv = dv.transform({
        type: 'map',
        callback: (row: any) => {
          return this.handleMergeFields(row, item);
        }
      });
    } else {
      dv = dv.transform(item);
    }

    return dv;
  }

  private createSource(data: any, dataPre: IDataPreConfig) {
    let dv;

    if (!_.get(dataPre, 'connector')) {
      dv = this.ds.createView().source(data);
    } else {
      dv = this.ds.createView().source(data, dataPre.connector);
    }

    return dv;
  }
}

export default CommonDataSet;
