import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private feedback: ToastrService, private translate: TranslateService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.translate.get('apierror').subscribe((messageTranslation: string) => {
            this.feedback.error(messageTranslation, 'Error');
          });
          return throwError(error);
        })
      );
  }
}
