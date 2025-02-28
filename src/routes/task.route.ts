import express from "express"
import { addTask, deleteTask, getAllTasks, getStreamData, getTask, updateCategory, updateTask } from "../controllers/task.controller.js"

const router = express.Router()

router.route("/").get(getAllTasks) 
router.route("/streaming").get(getStreamData)
router.route("/:id").get(getTask) 
router.route("/").post(addTask)
router.route("/:id").put(updateTask)
router.route("/:id").patch(updateCategory)
router.route("/:id").delete(deleteTask)




export default router