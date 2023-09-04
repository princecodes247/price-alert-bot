const buildDateQuery = (query: { date_from?: string; date_to?: string }) => {
  const queryObj: any = {};

  if (query?.date_from && query?.date_to) {
    queryObj.createdAt = {
      $gte: new Date(query?.date_from as string),
      $lte: new Date(query?.date_to as string),
    };
  } else if (query?.date_from) {
    queryObj.createdAt = {
      $gte: new Date(query?.date_from as string),
    };
  } else if (query?.date_to) {
    queryObj.createdAt = {
      $lte: new Date(query?.date_to as string),
    };
  }

  return queryObj;
};

export default buildDateQuery;
