import { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";
import axios from "axios"
import {getOAuthToken} from "../utils/getOauthToken.js"


export const addTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, deadline , priority} = req.body;

    if (!title || !description  || !deadline  ) {
        res.status(400).json({ message: "Please fill all fields." });
        return 
    }

    try {
        const newTask = await TaskModel.create({
            title,
            description,
            priority : priority || "Low",
            deadline,
        });

      
        if (newTask) {
            res.status(201).json({ message: "Task created successfully." });
            return 
        }
        res.status(500).json({ message: "Failed to create task." });
        return 

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return 
        }

        res.status(500).json({ message: "An unknown error occurred." });
        return 
    }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
 
    try {
        const allTasks = await TaskModel.find({})

      
        if (allTasks) {
             res.status(201).json({tasks : allTasks});
             return 
        }
        res.status(500).json({ message: "Failed to fetch tasks." });
        return 

    } catch (error: unknown) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
             return 
        }

         res.status(500).json({ message: "An unknown error occurred." });
         return 
    }
};
export const getTask = async (req: Request, res: Response): Promise<void> => {
          
    const taskId = req.params.id
    try {
        const task = await TaskModel.findOne({_id : taskId})

      
        if (task) {
             res.status(201).json({task});
             return 
        }
         res.status(500).json({ message: "Failed to fetch task with given ID." });
         return 

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return 
        }

        res.status(500).json({ message: "An unknown error occurred." });
        return 
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority, deadline } = req.body;
    const taskId = req.params.id

    if (!taskId || !title || !description  || !deadline) {
         res.status(400).json({ message: "Please fill all fields." });
         return 
    }

    console.log(priority)

    try {
        const hasUpdatedTask = await TaskModel.findByIdAndUpdate(taskId,{title , description , priority : priority , deadline  })
        
      
        if (hasUpdatedTask) {
            res.status(200).json({ message: "Task updated successfully." });
            return 
        }
         res.status(500).json({ message: "Failed to create task." });
         return 

    } catch (error: unknown) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
             return 
        }

        res.status(500).json({ message: "An unknown error occurred." });
        return 
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
          
    const taskId = req.params.id
    try {
        const hasDeletedTask = await TaskModel.findByIdAndDelete(taskId)

      
        if (hasDeletedTask) {
             res.status(201).json({message: "task deleted successfully"});
             return 
        }
         res.status(500).json({ message: "Failed to delete task with given ID." });
         return 

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return 
        }

         res.status(500).json({ message: "An unknown error occurred." });
         return 
    }
};
export const getStreamData=async (req:Request,res:Response):Promise<void>=>{
    try {
            
         let oauthToken = await getOAuthToken(); 
         
         
        const twitchResponse = await axios.get('https://api.twitch.tv/helix/streams', {
          headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': `Bearer ${oauthToken}`,
          },
        });
    
         
         res.status(200).json(twitchResponse.data);
         return 
      } catch (error) {
        console.error('Error fetching live streams:', error);
         res.status(500).json({ message: 'Failed to fetch live streams data' });
         return 
      }
}

export const updateCategory= async(req:Request,res:Response):Promise<void>=>{
    const taskId = req.params.id
    const {category}=req.body

    try {
        const hasCategoryUpadated = await TaskModel.findByIdAndUpdate(taskId,{category: category})

        if(hasCategoryUpadated){
            res.status(200).json({message:`Marked as ${category}`})
            return
        }
        res.status(500).json({ message: "Failed to update category." });
        return 
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return 
        }

        res.status(500).json({ message: "An unknown error occurred." });
        return 
    }
}