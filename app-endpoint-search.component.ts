/**
 * A common http search component works on the basis of search string and endpoint
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppEndpointSearchService } from './app-endpoint-search.service';

@Component({
    selector: 'app-endpoint-search',
    templateUrl: './app-endpoint-search.component.html',
    styleUrls: ['./app-endpoint-search.component.css'],
    providers: [AppEndpointSearchService]
})
export class AppEndpointSearchComponent implements OnChanges, OnInit {

  @Input() httpOptions: any = {};
  @Input() placeHolder;
  @Input() clearField;
  @Input() defaultValue;
  @Output() selectedHttpResult: EventEmitter<any> = new EventEmitter<any>();
  searchText = '';
  tempSearchText = '';
  timer: any;
  results = [];
  counter = -1;
  isActive = false;
  constructor(private _appEndpointSearchService: AppEndpointSearchService) { }

  ngOnInit() {
    this.searchText = this.httpOptions.defaultValue || '';
  }
  ngOnChanges() {
    this.clearField = '' + this.clearField;
    if (this.clearField === 'true') {
      this.searchText = '';
      this.results = [];
    }
    this.searchText = this.httpOptions.defaultValue || '';
  }
  /**
   * calls an API with respect user inputs (path and search string) and the result is formmatted in string of label
   */
  getEndpointSearchResult() {
    this.results = [];
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.searchText.trim();
      this._appEndpointSearchService.endpointSearch(this.httpOptions.path, this.searchText).subscribe((resultArray: any) => {
        if (resultArray) {
          this.isActive = true;
          this.counter = -1;
          if (this.httpOptions.formatString) {
            resultArray.forEach((el, i) => {
              let label = this.httpOptions.formatString;
              Object.keys(el).forEach(k => { label = label.replace(k, resultArray[i][k] || '');
              label = label.replace(/null/g, '');
            });
            this.results.push({ 'label': label, 'value': el });
          });
        }
        } else {
          this.results.push({ 'label': 'No results' });
        }
      });
  }, 500);
}

  /**
   * @param  {} value emit results on key enter mouse click to parent components
   */
  emitSelectedObject(value) {
    this.counter = -1;
    if (value) {
      this.selectedHttpResult.emit(value);
      this.searchText = value[this.httpOptions.contextField] || this.searchText;
    } else {
      this.searchText = '';
      this.selectedHttpResult.emit(null);
    }
    this.results = [];
    this.isActive = false;
  }
  /**
   * @param  {} event used to update counter value for keyboard event listner
   */
  upArrowEvent(event) {
    event.preventDefault();
    this.removeHighlight();
    this.counter >= 0 ? this.counter-- : this.counter = document.getElementsByClassName('search-result-item').length - 1;
    this.addHighlight();
    this.updateSearchFeild();
  }
  /**
   * @param  {} event  used to update counter value for keyboard event listner and adds a highlight class
   */
  downArrowEvent(event) {
    event.preventDefault();
    this.removeHighlight();
    this.counter < document.getElementsByClassName('search-result-item').length - 1 ? this.counter++ : this.counter = -1;
    this.addHighlight();
    this.updateSearchFeild();
  }
  /**
   * @param  {} event
   *  handles the click outside the result box updates counter and slear results
   */
  hideSearchResults() {
    this.isActive = false;
    this.results = [];
    this.counter = -1;
  }
  /** listens for enter key event . triggers the click on selected li
   */
  enterKeyEvent() {
    (document.getElementsByClassName('search-result-item')[this.counter] as HTMLInputElement).click();
    (document.activeElement as HTMLInputElement).blur();
    this.hideSearchResults();
  }
  /**
   * removes the highlight from the previous li node if true
   * updates the tempsearch value with user tped value for future refernce
   */
  removeHighlight() {
    const el = (document.getElementsByClassName('search-result-item')[this.counter] as HTMLInputElement);
    if (el) {
      el.classList.remove('highlight');
    } else {
      this.tempSearchText = this.searchText;
    }
  }
  /**
   * updates the li with 'highlight' class
   */
  addHighlight() {
    const el = (document.getElementsByClassName('search-result-item')[this.counter] as HTMLInputElement);
    if (el) {
      el.scrollIntoView({ block: 'end' });
      el.classList.add('highlight');
    }
  }
  /**
   * updates the search feild with temp value once user reaches the bootom or top of the list
   */
  updateSearchFeild() {
    this.counter === -1 || this.counter === document.getElementsByClassName('search-result-item').length ?
      this.searchText = this.tempSearchText :
      this.searchText = this.results[this.counter].value[this.httpOptions.contextField];
  }
}
