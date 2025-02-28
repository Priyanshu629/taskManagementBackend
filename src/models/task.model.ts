import  mongoose, {Schema,Document} from "mongoose"



interface Task extends Document{
   title:string
   description:string
   priority:string
   deadline:Date
   category:string
}

const TaskSchema = new Schema<Task> ({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
      },
    
      category: {
        type: String,
        enum: ["To Do", "On Progress", "Done", "Expired"],
        default: "To Do",
      },
      deadline: { type: Date, required: true }
})

export const TaskModel = mongoose.model<Task>("Task",TaskSchema);