import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {

  constructor(private dialogService: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Unknown error occurred';
        if (error.error.message){
          errorMessage = error.error.message;
        }
        this.dialogService.open(ErrorComponent, {data: {message: errorMessage}})
        return throwError(error);
      })
    );
  }
}
