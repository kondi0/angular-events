import { City } from '../cities/city.interface';

export interface EventView {
    id: number;
    isFree: boolean;
    name: string;
    city: City;
    startDate: Date;
    duration: number;
    joined: boolean;
}
