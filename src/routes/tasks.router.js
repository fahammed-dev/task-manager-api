const express = require('express');
const router = express.Router();
const {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
