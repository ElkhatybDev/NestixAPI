const paginate = (data, limit, skip) => {
    const total = data.length;

    const limitNumber = parseInt(limit) || total;
    const skipNumber = parseInt(skip) || 0;

    const paginatedData = data.slice(skipNumber, skipNumber + limitNumber);

    return {
    total,
    limit: limit ? limitNumber : null,
    skip: skip ? skipNumber : null,
    data: paginatedData
    };
};

module.exports = paginate; 