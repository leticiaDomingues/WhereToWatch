import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";

const DEFAULT_TIMEOUT_MESSAGE = 'Serviço temporariamente indisponível. Tente novamente mais tarde';

@Injectable()
export class ApiService {
  private url = 'https://api.themoviedb.org/3/';

  constructor(private httpClient: HttpClient) {}

  protected externalGet<T>(url: string, options?: {headers: HttpHeaders, params?: HttpParams}, numberOfRetries: number = 2): Observable<T> {
    return this.httpClient.get<T>(url, options)
      .pipe(
        retry(numberOfRetries),
        catchError((err) => this.handleError(err))
      );
  }

  protected externalPost<T>(url: string, body: any, options?: {headers: HttpHeaders, params?: HttpParams},
    numberOfRetries: number = 2): Observable<T> {
    return this.httpClient.post<T>(url, body, options)
      .pipe(
        retry(numberOfRetries),
        catchError((err) => this.handleError(err))
      );
  }

  protected get<T>(endpoint: string, params?: HttpParams, numberOfRetries?: number, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    const request = this.httpClient.get<T>(this.url.concat(endpoint), this.generateHeader(params));
    return this.getResponse<T>(request, numberOfRetries, redirectIfTimeout, timeoutMessage);
  }

  protected post<T>(endpoint: string, body: any, numberOfRetries?: number, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    const request = this.httpClient.post<T>(this.url.concat(endpoint), body, this.generateHeader());
    return this.getResponse<T>(request, numberOfRetries, redirectIfTimeout, timeoutMessage);
  }

  protected put<T>(endpoint: string, body: any, numberOfRetries?: number, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    const request = this.httpClient.put<T>(this.url.concat(endpoint), body, this.generateHeader());
    return this.getResponse<T>(request, numberOfRetries, redirectIfTimeout, timeoutMessage);
  }

  protected patch<T>(endpoint: string, body: any, numberOfRetries?: number, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    const request = this.httpClient.patch<T>(this.url.concat(endpoint), body, this.generateHeader());
    return this.getResponse<T>(request, numberOfRetries, redirectIfTimeout, timeoutMessage);
  }

  protected delete<T>(endpoint: string, numberOfRetries?: number, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    const request = this.httpClient.delete<T>(this.url.concat(endpoint), this.generateHeader());
    return this.getResponse<T>(request, numberOfRetries, redirectIfTimeout, timeoutMessage);
  }

  private generateHeader(params?: HttpParams): {headers: HttpHeaders, params?: HttpParams} {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = null; //this.autorizacaoService.token;

    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }

    return params ? {headers: headers, params: params} : { headers: headers };
  }

  private getResponse<T>(request: Observable<T>, numberOfRetries: number = 2, redirectIfTimeout?: boolean, timeoutMessage?: string): Observable<T> {
    return request
      .pipe(
        retry(numberOfRetries),
        catchError((err) => this.handleError(err, redirectIfTimeout, timeoutMessage))
      );
  }

  private handleError(error: HttpErrorResponse, redirectIfTimeout: boolean = true, timeoutMessage: string = DEFAULT_TIMEOUT_MESSAGE) {
    if (error.status === 401 || error.status === 403) {
        // TODO: deslogar usuário
    } else if (error.status === 504 && redirectIfTimeout) {
        // this.notificacao.abreSnackDeErro(timeoutMessage);
        // this.autorizacaoService.deslogaUsuario();
        // TODO: timeout, deslogar usuário
    }
    return throwError(error);
  };
}

