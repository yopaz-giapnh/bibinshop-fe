import { format } from 'date-fns';

export function formatDateString(
  dateString: string | undefined | null,
  formatString = 'yyyy/MM/dd'
): string {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  return format(date, formatString);
}
