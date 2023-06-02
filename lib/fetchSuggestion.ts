import { formatTodoForApi } from "./formatTodosForApi";

export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodoForApi(board);
  const entries = Object.entries(todos);
  let suggestion = "Hi User, you have ";
  entries.forEach(([key, value]) => {
    suggestion += `${key} -> ${value}, `;
  });
  suggestion += "tasks.";
  return suggestion;
};
