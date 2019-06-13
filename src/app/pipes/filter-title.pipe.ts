import { Pipe, PipeTransform } from '@angular/core';
import {EventView} from '../models/events/event-view.interface';

@Pipe({
    name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(({name, city}: EventView) => {
                return name.search(searchText) !== -1 || city.name.search(searchText) !== -1;
            });
        }
    }
}
