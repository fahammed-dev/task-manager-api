const mongoose = require('mongoose');
const Task = require('../models/task.model');
const asyncWrapper = require('../utils/asyncWrapper');
const { createCustomError } = require('../utils/error');

const getAllTask = asyncWrapper(async (_req, res, next) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  if (tasks.length === 0) {
    return next(createCustomError('No task found!', 404));
  }
  return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { name, completed } = req.body;
  const task = await Task.find({ name });
  if (task) {
    return next(
      createCustomError('This name is used, try with a different name', 303)
    );
  }
  const newTask = await Task.create({ name, completed });
  return res.status(201).json({ newTask });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createCustomError('Invalid task id', 406));
  }
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError('There is no task with this id', 404));
  }
  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createCustomError('Invalid task id', 406));
  }
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError('There is no task with this id', 404));
  }
  const updatedTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true, //note:get the updated data
    runValidators: true, //note: revalidate the data
    //overwrite: true, //note:use for put method
  });
  return res.status(200).json(updatedTask);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createCustomError('Invalid task id', 406));
  }
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError('There is no task with this id', 404));
  }
  const deletedTask = await Task.findByIdAndDelete(id);
  return res.status(200).json(`Task deleted with id of ${deletedTask._id}`);
});

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
