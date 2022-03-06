# react-bootstrap-autocomplete-list

### React autocomplete list component for bootstrap 5
### Compatible with Next.js

<div align="center">
  <img src="https://raw.githubusercontent.com/ily-salamat/react-bootstrap-autocomplete-list/master/autocomplete-list.gif" alt="autocomplete list" title="autocomplete list" width="500">
</div>

# Installation
~~~
npm install react-bootstrap-autocomplete-list
~~~

## ⚠️ Important

This package depends on `react`, `bootstrap 5` and `popperjs`. Please make sure you have them installed.

Also make sure you have imported `bootstrap` css & js into your `react` project.

# Example

~~~
import { BS5FloatingAutocompleteList } from 'bootstrap-5-autocomplete-list';

export default function Example() {

  const items = ['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6'];

  function getSelectedValue(item) {
    console.log(item);
  }

  return (
    <>
      <BS5FloatingAutocompleteList list={items} selectedValue={getSelectedValue}></BS5FloatingAutocompleteList>
    </>
  );
}
~~~

# Properties

|Prop|Type|Default|Description|
|:----|:----|:----|:----|
|id|String|'autocompleteList'|Component identifier, if you use several instances of this component, it's important to use a different identifier for each instance|
|label|String|'Autocomplete List'|Label for input element|
|list|String[]|['Item1', 'Item2', 'Item3']|List of items|
|startAt|number|0|Set character index to start searching for items|
|selectedValue|function| |Execute a function to get the selected item|
|valueOnChange|function| |Execute a function when a user changes the content of the input field|
|maxHeight|number|'200px'|Set maximum list item height|
