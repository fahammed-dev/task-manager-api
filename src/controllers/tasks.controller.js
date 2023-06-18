const getAllTask = async (req, res) => {
  res.json({ msg: 'All Items' });
};

const createTask = async (req, res) => {
  res.json({ msg: 'Create Task' });
};

const getSingleTask = async (req, res) => {
  res.json({ msg: 'Single Task' });
};

const updateTask = async (req, res) => {
  res.json({ msg: 'Update Task' });
};

const deleteTask = async (req, res) => {
  res.json({ msg: 'Delete Task' });
};

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
