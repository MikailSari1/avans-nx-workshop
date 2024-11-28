import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IGuide } from '@TulpReizen2/shared/api';
import { Injectable } from '@angular/core';
import { environment} from "@TulpReizen2/shared/util-env";

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class GuideService {
  endpoint = environment.dataApiUrl + '/guide';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IGuide[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IGuide[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IGuide[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
 public read(id: string | null, options?: any): Observable<IGuide> {
  console.log(`read ${this.endpoint}/${id}`);
  return this.http
    .get<ApiResponse<IGuide>>(`${this.endpoint}/${id}`, {
      ...options,
      ...httpOptions,
    })
    .pipe(
      tap(console.log),
      map((response: any) => response.results as IGuide),
      catchError(this.handleError)
    );
}

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in GuideService', error);

    return throwError(() => new Error(error.message));
  }

  public delete(id: string | null, options?: any): Observable<void> {
    console.log(`delete ${this.endpoint}`);
    return this.http
      .delete<void>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(() => console.log(`Deleted item with id: ${id}`)),
        catchError(this.handleError)
      );
  }

  public create(data: IGuide | null, options?: any): Observable<IGuide> {
    console.log(`create ${this.endpoint}`);

    return this.http
      .post<ApiResponse<IGuide>>(this.endpoint, data, {
        ...options,
        /*
                ...httpOptions,
         */
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IGuide),
        catchError(this.handleError)
      );
  }

  /**
   * Update an item.
   */
  public update(data: any, options?: any): Observable<IGuide> {
    console.log(`update ${this.endpoint}/${data?.id}`);

    return this.http
      .put<ApiResponse<IGuide>>(`${this.endpoint}/${data?.id}`, data, {
        ...options,
        /*
                ...httpOptions,
         */
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IGuide),
        catchError(this.handleError)
      );
  }
}
