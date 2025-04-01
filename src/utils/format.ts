import moment from 'moment';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

export const formatDate = (date: moment.MomentInput): string => {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}


interface StatusClasses {
  [key: string]: string;
}

export const getStatusClasses = (status: string): string => {
  const statusClasses: StatusClasses = {
    Successful: 'bg-green-400/20 text-green-500',
    Pending: 'bg-yellow-400/20 text-yellow-500',
    Failed: 'bg-red-400/20 text-red-600',
    Upcoming: 'bg-purple-100 text-purple-500',
  };

  return statusClasses[status] || 'bg-gray-100 text-gray-500';
};


export const formStatusClasses = (status: 'published' | 'draft' | string): string => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-500 dark:bg-green-500 dark:text-white';
    case 'draft':
      return 'bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white';
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-500 dark:text-white';
  }
};