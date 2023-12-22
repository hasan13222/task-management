import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const Task = ({task}) => {  

  const notify = () => toast("Task Updated Successfully");
  const queryClient = useQueryClient()



  const handleListChange = (newStatusText) => {
    const taskId = task._id;
    const newStatus = {status: newStatusText}
    axios.patch(`http://localhost:5000/tasks/${taskId}`, newStatus)
    .then(data => {
      if(data.data){
        notify();
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const handleListDelete = () => {
    const taskId = task._id;
    
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
    .then(data => {
      if(data.data){
        toast("Task Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })
  }
  return (
    <>
      <div className="card w-full bg-base-100 shadow-sm border border-slate-50">
        <div className="card-body items-center">
          <h2 className="card-title">{task.task_title}</h2>
          <p>
            {task.task_desc}
          </p>
          <div className="flex w-full justify-between">
            <p className="flex-grow-0"><span className="font-medium">Deadline:</span> {task.task_deadline}</p>
            <p className="flex-grow-0"><span className="font-medium">Priority:</span> {task.task_priority}</p>

          </div>
          <div className="card-actions justify-end">
            {task.status !== 'todo' && <button onClick={() => handleListChange("todo")} className="btn btn-info">Todo</button>}
            {task.status !== 'progress' && <button onClick={() => handleListChange("progress")} className="btn btn-info">In Progress</button>}
            {task.status !== 'complete' && <button onClick={() => handleListChange("complete")} className="btn btn-accent">Complete</button>}
            <button onClick={() => handleListDelete()} className="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Task;
