import {TimeOfDay} from './time-of-day.enum';

export interface EventFilter {
  free?: boolean;
  text?: string;
  timeOfDay?: TimeOfDay;
}
