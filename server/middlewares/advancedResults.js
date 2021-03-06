const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // copy req.query
  const reqQuery = { ...req.query };
  const logicalOps = ['in', 'lte', 'gte', 'lt', 'gt'];
  //Fields to exclude;
  const removeFields = ['select', 'sort', 'page', 'limit'];
  Object.values(req.query).map((obj) => {
    logicalOps.map((operator) => {
      if (obj[operator] === 'undefined') {
        const key = Object.keys(req.query).find(
          (key) => req.query[key] === obj
        );
        removeFields.push(key);
      }
    });
  });

  // loop over removefields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //creating query string

  let queryStr = JSON.stringify(reqQuery);

  //Create operators ($gt, $gte, etc...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = model.find(JSON.parse(queryStr));

  // select fields;
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (populate) {
    query = query.populate(populate);
  }

  // sort fields;
  if (req.query.sort) {
    const sortBy = req.query.select.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execution of query
  const results = await query;

  //pagination result;
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
