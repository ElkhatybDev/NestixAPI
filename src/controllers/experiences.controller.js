const experiences = require("../data/experiences.json");
const users = require("../data/users.json");
const paginate = require("../utils/paginate");

const getAllExperiences = (req, res) => {
  let result = experiences;

  const { q, limit, skip } = req.query;

  if (q) {
    const search = q.toLowerCase();

    result = result.filter(exp =>
      exp.title.toLowerCase().includes(search) ||
      exp.content.toLowerCase().includes(search)
    );
  }

  const pagination = paginate(result, limit, skip);

  const data = pagination.data.map(exp => {
    const user = users.find(u => u.id === exp.userId);

    return {
      ...exp,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null
    };
  });

  res.status(200).json({
    message: "Experiences fetched successfully",
    total: pagination.total,
    limit: pagination.limit,
    skip: pagination.skip,
    data
  });
};

const getExperienceById = (req, res) => {
  const id = parseInt(req.params.id);

  const exp = experiences.find(e => e.id === id);

  if (!exp) {
    return res.status(404).json({
      message: "Experience not found"
    });
  }

  const user = users.find(u => u.id === exp.userId);

  res.status(200).json({
    message: "Experience found",
    data: {
      ...exp,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null
    }
  });
};

const addExperience = (req, res) => {
  const newExp = {
    id: experiences.length + 1,
    ...req.body
  };

  experiences.push(newExp);

  res.status(201).json({
    message: "Experience added successfully",
    data: newExp
  });
};

const deleteExperience = (req, res) => {
  const id = parseInt(req.params.id);

  const index = experiences.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Experience not found"
    });
  }

  const deleted = experiences.splice(index, 1)[0];

  res.status(200).json({
    message: "Experience deleted successfully",
    data: deleted
  });
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  addExperience,
  deleteExperience
};