import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Form } from './form';

@Injectable({ providedIn: 'root' })
export class FormService {

  submit_status: string = '';
  private heroesUrl = 'https://cs251-outlab-6.herokuapp.com';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  get_init(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.heroesUrl}/initial_values/`)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Form[]>('getHeroes', []))
      );
  }

  submitForm(data: Form[]): Observable<Form[]> {
    return this.http.post<Form[]>(`${this.heroesUrl}/add_new_feedback/`, data).pipe(
      tap(_ => {
        this.log(`Submitted Successfully`);
        this.submit_status = `Submitted Successfully!!!`;
      }),
      catchError(this.handleError<Form[]>('Submit Error'))
    );
  }


  public get ShowMsg() {
    return this.submit_status
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      this.submit_status = `Submission Failed!!!`;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`${message}`);
  }
}