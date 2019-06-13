import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return _.truncate(value, {
        length: environment.postBodyLength
      }
    );
  }

}
