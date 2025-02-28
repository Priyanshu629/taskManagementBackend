import { TaskModel } from "../models/task.model.js";
import axios from "axios";
export const addTask = async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    if (!title || !description || !deadline) {
        res.status(400).json({ message: "Please fill all fields." });
        return;
    }
    try {
        const newTask = await TaskModel.create({
            title,
            description,
            priority: priority || "Low",
            deadline,
        });
        if (newTask) {
            res.status(201).json({ message: "Task created successfully." });
            return;
        }
        res.status(500).json({ message: "Failed to create task." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await TaskModel.find({});
        if (allTasks) {
            res.status(201).json({ tasks: allTasks });
            return;
        }
        res.status(500).json({ message: "Failed to fetch tasks." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const getTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await TaskModel.findOne({ _id: taskId });
        if (task) {
            res.status(201).json({ task });
            return;
        }
        res.status(500).json({ message: "Failed to fetch task with given ID." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const updateTask = async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    const taskId = req.params.id;
    if (!taskId || !title || !description || !deadline) {
        res.status(400).json({ message: "Please fill all fields." });
        return;
    }
    console.log(priority);
    try {
        const hasUpdatedTask = await TaskModel.findByIdAndUpdate(taskId, { title, description, priority: priority, deadline });
        if (hasUpdatedTask) {
            res.status(200).json({ message: "Task updated successfully." });
            return;
        }
        res.status(500).json({ message: "Failed to create task." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const hasDeletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (hasDeletedTask) {
            res.status(201).json({ message: "task deleted successfully" });
            return;
        }
        res.status(500).json({ message: "Failed to delete task with given ID." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const updateCategory = async (req, res) => {
    const taskId = req.params.id;
    const { category } = req.body;
    try {
        const hasCategoryUpadated = await TaskModel.findByIdAndUpdate(taskId, { category: category });
        if (hasCategoryUpadated) {
            res.status(200).json({ message: `Marked as ${category}` });
            return;
        }
        res.status(500).json({ message: "Failed to update category." });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "An unknown error occurred." });
        return;
    }
};
export const getStreamData = async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        if (!tasks.length) {
            res.status(404).json({ message: "No tasks found." });
            return;
        }
        const taskTitles = tasks.map(task => task.title);
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            res.status(500).json({ message: "YouTube API Key is missing" });
            return;
        }
        const youtubeStreamsPromises = taskTitles.map(async (title) => {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    q: title,
                    type: 'video',
                    eventType: 'live',
                    maxResults: 1,
                    key: apiKey,
                }
            });
            return { title, streams: response.data.items || [] };
        });
        const tasksWithStreams = await Promise.all(youtubeStreamsPromises);
        res.status(200).json({ tasksWithStreams });
    }
    catch (error) {
        console.error("Error fetching tasks with YouTube streams:", error);
        res.status(500).json({ message: "Failed to fetch tasks with YouTube streams." });
    }
};
