export enum OrderStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Completed = 'Completed',
}

export enum CollectionStatus {
  None = 'None',
  InProgress = 'In Progress',
  Ready = 'Ready',
  Collected = 'Collected',
}

export enum PaymentMethods {
  CreditCard = 'Credit Card',
  PayPal = 'PayPal',
  Cash = 'Cash',
}
