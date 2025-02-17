export class Revenue {
  revenueId: number;
  month: Date;
  revenue: number;

  constructor(revenueId: number, month: Date, revenue: number) {
    this.revenueId = revenueId;
    this.month = month;
    this.revenue = revenue;
  }
}
