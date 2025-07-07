const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Text = require('../model/Text');

//ROUTE 1: Get all the task using GET" "

router.get('/tasks', fetchuser, async (req,res) => {
    const tasks = await Text.find({userId: req.user});
    res.json(tasks);
});

//ROUTE 2: Add the task using POST" "

router.post('/tasks',fetchuser, async(req,res) => {
    const task = new Text({...req.body, userId: req.user});
    await task.save();
    res.json(task);
});

//ROUTE 3: Deleting the task

router.delete("/tasks/:id", fetchuser, async (req,res) => {
    await Text.findOneAndDelete({_id: req.params.id,  userId: req.user});
    res.json({message: "Task deleted"})
});

//ROUTE 4: Updating the task

router.patch("/tasks/:id/status", fetchuser, async (req,res) => {
   const { status } = req.body;
   const task = await Text.findOneAndUpdate(
    {_id: req.params.id, userId: req.user },
    { status },
    { new: true }
   );
   if(!task)
   {
    return res.status(404).json({messsage: "Task not Found"});
   }
   res.json(task);
});


router.patch("/tasks/:id/priority", fetchuser, async (req,res) => {
   const { priority } = req.body;
   const task = await Text.findOneAndUpdate(
    {_id: req.params.id, userId: req.user },
    { priority },
    { new: true }
   );
   if(!task)
   {
    return res.status(404).json({messsage: "Task not Found"});
   }
   res.json(task);
});



module.exports = router