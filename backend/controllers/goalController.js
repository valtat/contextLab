const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  const goals = await Goal.find({user: req.user});
  res.status(200).json(goals);
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  const {title, createdAt} = req.body;
  if(!title || !createdAt){
    res.status(400).json({error:"Fill in all the fields"});
  }
  try {
    const goal = await Goal.create({
      user:req.user,
      title,
      createdAt:createdAt,
    });
    res.status(201).json({
      id: goal._id,
      user: goal.user,
      title: goal.title,
      createdAt: goal.createdAt,
    });
    console.log(goal.title.length);
  } catch (error) {
    if (error.name === 'ValidationError')/*validation error like invalid email*/{
      return res.status(400).json({ error: error.message });}
    else{
      next(error);
  }
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
 const {title, createdAt} = req.body;
  if(!title || !createdAt){
    res.status(400).json({error:"Fill in all the fields"});
  }
  try {
    const goal = await Goal.findById(req.params.id);
    if(goal){
      goal.title = title;
      goal.createdAt = createdAt;
      const updatedGoal = await goal.save();
      res.status(201).json({
        id: goal._id,
        user: goal.user,
        title: goal.title,
        createdAt: goal.createdAt,
      });
    }else{
      res.status(404).json({error:"Goal not found"});
    }
  } catch (error) {
    if (error.name === 'ValidationError')/*validation error like invalid email*/{
      return res.status(400).json({ error: error.message });}
    else{
      next(error);
  }
}};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if(goal){
      await goal.remove();
      res.status(201).json({message:"Goal removed", goal: goal});
    }else{
      res.status(404).json({error:"Goal not found"});
    }
  } catch (error) {
    next(error);
  }

};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
