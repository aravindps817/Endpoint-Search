# Endpoint-Search

It's an angular component for generic usage.

## Installation

Download the component and add it into your module.

## Usage

```TypeScript
import { AppEndpointSearchComponent } from './app-endpoint-search/app-endpoint-search.component';
import { AppEndpointSearchService } from './app-endpoint-search/app-endpoint-search.service';

@NgModule({
  declarations: [
    AppComponent,
    ....,
    AppEndpointSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileDropModule
  ],
  providers: [AppEndpointSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//** in your html file"
 <app-endpoint-search [httpOptions]="httpSearchOptions" [clearField]="clearField"[placeHolder]="'Search Principal Investigator'"
 (onSelect)="selectedPerson($event)" (onEmpty)="emptyResult($event)"></app-endpoint-search>

##sample Object

    httpOptions.contextField = 'fullName';
    httpOptions.formatString = 'fullName';
    httpOptions.path = 'findPersons';
    httpOptions.size = 20;
    httpOptions.theme = 'red';
    httpOptions.width = '100%';
    httpOptions.fontSize = '12px';
    httpOptions.defaultValue = 'My search Text';
```

## Parameters
Name  | Description | Example | 
------------- | ------------- | -------------
(onSelect)  | On mouse click function and close button event | (onSelect)="yourFunction($event)"
(onEmpty)  | returns search string on change event of no result condition | (onEmpty)="yourFunction($event)" 
Placeholder  | placeholder for search box| [placeHolder]=" place holder values" 
httpOptions  | pass as input for configuration | [httpOptions] ="yourOptions"
httpOptions.size  | maximum size of search return (optional) | httpOptions.size = '20'
httpOptions.path | select the api path | httpOptions.path = 'defaultpath'
httpOptions.contextField | field to be shown on search field on mousedown event  |  httpOptions.contextField = 'index field to be shown'
httpOptions.formatString  | format for the output | httpOptions.formatString = 'firstindex | secondIndex'
httpOptions.theme | Custom color for the search output (optional) | httpOptions.theme = 'your color'
httpOptions.fontSize  | Font size of search result (optional)  | httpOptions.fontSize = '20px'
httpOptions.width  | Width  of search (optional) | httpOptions.width = '100%'
httpOptions.defaultvalue  | A default value to be shown on search field (optional)  | httpOptions.defaultValue = 'Your Default value'

## Other functionalities


To clear search field any time, use "clearField". The variable is passed in endpoint search component intialization. Syntax is, this.clearField = new String('true');

If you need to update the 'defualtValue' after intailization use new refernce for your options

```TypeScript

this.httpOptions = Object.assign({}, this.httpOptions) 
this.clearField = new String('false');

```


The "(onSelect)" will emit "null" on close button usage, mouse click on error and no result cases. Handle your functions accordingly.

On error or no results the drop down will be showing "no results".

## Contributing
Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## Style changes
 For custom styling change the style inside app-endpoint-search.component.css.

## License
