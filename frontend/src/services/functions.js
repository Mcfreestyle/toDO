export function divideTasksByDuedate(allTasks) {
  const currentDate = new Date();
  const overdueTasks = [];
  const todoTasks = [];

  for (const task of allTasks) {
    if (new Date(task.due_date) < currentDate) {
      overdueTasks.push(task);
    } else {
      todoTasks.push(task);
    }
  }
  return [overdueTasks, todoTasks];
}

export function toISOString(date) {
  if (date instanceof Date) {
    return date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + 'T' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds() + '.' +
      date.getMilliseconds() + 'Z';
  }
  return date.$y + '-' +
    (date.$M + 1) + '-' +
    date.$D + 'T' + 
    date.$H + ':' + 
    date.$m + ':' +
    date.$s + '.' +
    date.$ms + 'Z';
}