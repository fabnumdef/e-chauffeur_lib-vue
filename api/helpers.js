export const ACCEPT_RANGES = 'x-accept-ranges';
export const CONTENT_RANGE = 'x-content-range';
export const RANGE = 'X-Range';

export const computePagination = (response) => {
  const paginations = {};
  (response.headers[ACCEPT_RANGES] || '').split(',').forEach((range) => {
    const regex = new RegExp(`${range} (\\d*)-(\\d*)/(\\d*)#(\\d*)`);
    const [, ...d] = regex.exec(response.headers[CONTENT_RANGE]);
    const [offset, max, total, limit] = d.map((n) => parseInt(n, 10));

    paginations[range] = {
      offset,
      total,
      count: max - offset + 1,
      limit,
    };
  });
  return paginations;
};
