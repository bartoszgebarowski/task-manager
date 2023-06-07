import { toast } from "react-toastify";

// Specify message and visual indicator for addTask toast emitter
export const addTaskToast = () => {
  toast.success("Task added successfully !");
};

// Specify message and visual indicator for deleteTask toast emitter
export const deleteTaskToast = () => {
  toast.success("Task removed successfully !");
};

// Specify message and visual indicator for editTask toast emitter
export const editTaskToast = () => {
  toast.success("Task updated successfully !");
};

// Specify message and visual indicator for addComment toast emitter
export const addCommentToast = () => {
  toast.success("Comment added successfully !");
};

// Specify message and visual indicator for editComment toast emitter
export const editCommentToast = () => {
  toast.success("Comment updated successfully !");
};

// Specify message and visual indicator for removeComment toast emitter
export const removeCommentToast = () => {
  toast.success("Comment removed successfully !");
};
