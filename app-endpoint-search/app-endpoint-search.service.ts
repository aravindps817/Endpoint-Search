import { Injectable } from '@angular/core';
import { CommonService } from '../../common/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppEndpointSearchService {

constructor(private _commonService: CommonService, private _http: HttpClient) { }

endpointSearch(servicePath, searchString) {
    return this._http.get(this._commonService.baseUrl + '/' + servicePath + '?searchString=' + searchString);
  }


}
