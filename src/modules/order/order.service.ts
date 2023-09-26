import { DateRange } from '../../types/general.types';
import { CollectionTimeRange } from '../profile/profile.types';

class OrderService {
  /**
   * Calculates the ideal preparation start and end times.
   * @param productPrepTime - The selected product preparation time.
   * @param collectionTime - The desired collection time.
   * @returns An object with the ideal start and end times.
   */
  calculateOrderTimeRange(
    productPrepTime: number,
    collectionTime: Date
  ): DateRange {
    const prepStartTime = new Date(collectionTime);
    const prepEndTime = new Date(collectionTime);

    prepStartTime.setMinutes(prepStartTime.getMinutes() - productPrepTime);
    prepEndTime.setMinutes(prepEndTime.getMinutes() + productPrepTime);

    return { start: prepStartTime, end: prepEndTime };
  }

  /**
   * Checks if the ideal preparation start and end times are within the baker's collection time range.
   * @param collectionTimeRange - The baker's collection time range.
   * @param idealPrepStartTime - The calculated ideal preparation start time.
   * @param orderTimeRange - The calculated ideal preparation end time.
   * @returns True if the times are within the range, false otherwise.
   */
  isPrepTimeInCollectionRange(
    collectionTimeRange: CollectionTimeRange,
    orderTimeRange: DateRange
  ): boolean {
    const startTime = collectionTimeRange.startTime;
    const endTime = collectionTimeRange.endTime;

    const idealStartTime = this.dateToMinutes(orderTimeRange.start);
    const idealEndTime = this.dateToMinutes(orderTimeRange.end);

    return idealStartTime >= startTime && idealEndTime <= endTime;
  }

  private dateToMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
  }
}

export default new OrderService();
