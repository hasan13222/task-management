import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const {
    isLoading,
    isFetching,
    error,
    data: tasks,
  } = useQuery({
    queryKey: ["tasks", userEmail],
    queryFn: () =>
      fetch(`http://localhost:5000/tasks?email=${userEmail}`).then((res) =>
        res.json()
      ),
  });
  return (
    <>
      <div className="container-fluid task-manager mt-9">
        <div className="container task-cont mx-auto">
          {error && <h3>{error.message}</h3>}
          {(isLoading || isFetching) && (
            <span className="loading loading-ring loading-lg"></span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="todo-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50">
              <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                To Do Task List
              </h3>
              {tasks?.map((item) => {
                if (item.status === "todo") {
                  return (
                    <Fragment key={item.id}>
                      <Task task={item}/>
                    </Fragment>
                  );
                }
              })}
            </div>
            <div className="progress-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50">
              <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                In Progress Task List
              </h3>
              {tasks?.map((item) => {
                if (item.status === "progress") {
                  return (
                    <Fragment key={item.id}>
                      <Task task={item}/>
                    </Fragment>
                  );
                }
              })}
            </div>
            <div className="complete-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50">
              <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                Complete List
              </h3>
              {tasks?.map((item) => {
                if (item.status === "complete") {
                  return (
                    <Fragment key={item.id}>
                      <Task task={item}/>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
