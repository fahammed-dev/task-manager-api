const mongoose = require('mongoose');
const Task = require('../models/task.model');

const getAllTask = async (_req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    if (tasks.length === 0) {
      return res.status(404).json({ msg: 'No task found!' });
    }
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await Task.find({ name });
    if (!task.length === 0) {
      return res
        .status(200)
        .json({ msg: 'This name is used, try with a different name' });
    }
    const newTask = await Task.create({ name, completed });
    return res.status(201).json({ newTask });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid task id' });
  }
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'There is no task with this id' });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid task id' });
  }
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'There is no task with this id' });
    }
    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true, //note:get the updated data
      runValidators: true, //note: revalidate the data
      overwrite: true, //note:use for put method
    });
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid task id' });
  }
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'There is no task with this id' });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    return res.status(200).json(`Task deleted with id of ${deletedTask._id}`);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
