import * as _ from 'lodash';

function validataDataMapping(dataMapping: any) {
  if (_.isEmpty(dataMapping.column) || _.isEmpty(dataMapping.row)) {
    throw new Error('please set at least 1 column or row in dataMapping.');
  }

  let { column, row } = dataMapping;

  dataMapping.column = Array.isArray(column) ? column : [column];
  dataMapping.row = Array.isArray(row) ? row : [row];

  return dataMapping;
}

export const process = (config: any) => {
  const { dataMapping } = config;

  if (_.isEmpty(dataMapping)) { return config; }

  config.dataMapping = validataDataMapping(dataMapping);

  return config;
};
