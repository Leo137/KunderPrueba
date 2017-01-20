import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ComicDataWrapper, Comic }     from '../models/comic';
import { Md5 } from 'ts-md5/dist/md5';

/*
  Generated class for the HeroService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComicService {

	private comicsUrl = 'https://gateway.marvel.com/v1/public/comics';  // URL to web API
	private publicKey = '35e0d5285ca976e4ca0d505ae991c336';
	private privateKey = '7931cf6ebf10944d2e4100eba0221fd8e131d710';

	constructor(public http: Http) {}

	getComics(offset = 0, limit = 10, queryString = null): Observable<Comic[]> {
		if(queryString){

			// Check if the query is year-like
            if(queryString.match(/\d{4}/)) {
            	return this.http.get(this.comicsUrl, this.requestOptions(offset, limit, null, queryString))
            	        .map(this.extractData)
            	        .catch(this.handleError);
            }
            else {
            	return this.http.get(this.comicsUrl, this.requestOptions(offset, limit, queryString))
                    .map(this.extractData)
                    .catch(this.handleError);
            }
		}
		else {

			// Normal query

			return this.http.get(this.comicsUrl, this.requestOptions(offset, limit))
                    .map(this.extractData)
                    .catch(this.handleError);
		}
  	}

  	private requestOptions(offset, limit, queryStringTitle = null, queryStringYear = null) {
  		let params = new URLSearchParams();
      let hash = String(Date.now());
  		params.set('apikey', this.publicKey);
  		params.set('ts', hash);
  		params.set('hash', String(Md5.hashStr(hash + this.privateKey + this.publicKey)));
  		params.set('format', 'comic');
  		params.set('orderBy', '-onsaleDate');
  		params.set('offset', offset);
  		params.set('limit', limit);
  		if(queryStringTitle) {
  			params.set('titleStartsWith', queryStringTitle);
  		}
  		if(queryStringYear) {
  			console.log(queryStringYear)
  			params.set('startYear', queryStringYear);
  		}
  		return new RequestOptions({
  		  search: params
  		});
  	}

	private extractData(res: Response) {
		console.log(res);
		let body = res.json() || { };
		return new ComicDataWrapper().deserialize(body).data.results;
	}

	private handleError (error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
