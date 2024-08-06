import express from 'express';
import mongoose from 'mongoose';

import Task from '../models/tasks.js'

const router = express.Router();

export const getTasks = async (req, res) => { 
    try {
        const Tasks = await Task.find();
                
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTask = async (req, res) => { 
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    const newTask = new Task({ title, description, status })

    try {
        await newTask.save();

        res.status(201).json(newTask );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    const updatedTask = { title, description, status , _id: id };

    await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    await Task.findByIdAndRemove(id);

    res.json({ message: "Task deleted successfully." });
}



export default router;