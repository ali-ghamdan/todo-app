import { TaskStatus } from './tasks.types';

export function GetTaskStatus(status: number) {
  switch (status) {
    case TaskStatus.SUCCESS:
      return 'Success';
    case TaskStatus.IN_PROGRESS:
      return 'In Progress';
    case TaskStatus.CANCELED:
      return 'Canceled';
    case TaskStatus.PENDING:
      return 'Pending';
  }
}
