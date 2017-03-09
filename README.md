# Gitcharts

The Gitcharts jQuery plugin easily allows you to create data charts of a user, or organizations commit events from Github. This plugin makes use of the Github puplic API data to construct charts using the Morris.js plugin. 

There are three available charts which can be used to display the data... **Donut**, **Bar**, and **Line**. Continue reading below to see installation and usage instructions.

*Note: The Github API only returns data for the past 90 days.*

## Installation

To get started with this plugin, first include the required dependencies. 

```html
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
```

This plugin requires an updated version of jQuery, <a href="http://morrisjs.github.io/morris.js/">morris.js</a>, and <a href="http://dmitrybaranovskiy.github.io/raphael/">raphael.js</a>.

Once those scripts are included, you can download this repo as a zipped file and extract the package. Copy and paste data/gitcharts.min.js into your projects files. Link to the file with a script tag from your html (below the dependencies scripts). Ex..

```html
<script src="githubdata.js"></script>
```

## Usage & Examples

The first step to using this plugin is creating a div element where the chart will be displayed. Add a div to your html, and assign it a class or id which we will reference later. You can name to class or id whatever you like. 

```html
<div class="gitchart"></div>
```

To activate the plugin on that element, we reference the selector and call the *gitcharts* method with whatever parameters you need. 

```js
$('.gitchart').gitcharts({

});
```

The plugin allows you to return data for either an individual github username, or an organization. It also offers three different types of charts to display the data in. At a minimum, you must specify the user type, the username/ organization name, and the chart type. Ex..

```js
$('.gitchart.').gitcharts({
    userType: 'individual',
    username: 'jdoyle112',
    chart: 'donut'
});
```

####Available Options & Parameters
| Attribute       | Default        | Values                          | Description                                                                                                                                                                                                     |
|-----------------|----------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| userType        | 'individual'   | 'individual'   'organization'   | Use this field to specify whether a an individual user or organization is being used.                                                                                                                           |
| username        | null           | 'sample_github_username'        | Use this field to specify the github username of the individual who's data should be returned.                                                                                                                  |
| organization    | null           | 'sample_github_org'             | Use this field to specify the github organization name who's data should be returned.                                                                                                                           |
| chart           | 'donut'        | 'donut' 'bar' 'line'            | Use this field to specify the type of chart to be displayed.                                                                                                                                                    |
| xAxisDataType   | 'repos'        | 'repos' 'date'                  | This field will specify the data type of the x axis of the chart.                                                                                                                                               |
| colors          | ['#097054', '#ffde00', '#6599ff', '#ff9900']      | Array of hex colors             | Use this field to set the colors to be used for the charts. It accepts an array of string hex color values.                                                                                                     |
| grid            | true           | true false                      | This field will hide or show horizontal grid lines for line and bar charts.                                                                                                                                     |
| hideOnHover     | true           | true false 'always'             | Use this field to control how the hover popup is displayed. **true** will only show the popup when the mouse is hovering over it. **false** will always show the popup. **'always'** will never show the popup. |
| lineWidth       | 2              | Any number value                | Use this field to set the line width in px for line graphs.                                                                                                                                                     |
| pointSize       | 4              | Any number value                | Use this field to set the point size in px for line graphs.                                                                                                                                                     |
| pointFillColors | Same as colors | Array of hex colors             | Use this field to set the point colors for line graphs. By default, it uses the same values set for colors.                                                                                                     |
| smooth          | true           | true false                      | This field will specify how the line for line graphs should be drawn. True will make the lines smooth, false will make them rigid.                                                                              |
| resize          | false          | true false                      | Use this field to specify whether the chart should resize itself when the window screen size changes. Set to false by default due to impact on performance.                                                     |

*Note: the y axis of all charts will always be # of commits.

####Examples


1. Personal donut chart displaying data grouped by repos.

```js
$('.github-chart').gitcharts({
    userType: 'individual',
    username: 'jdoyle112',
    chart: 'donut',
});
```


2. Personal line chart displaying data grouped by dates with values for *xAxisDataType*, *lineWidth* and *smooth*.

```js
$('.github-chart').gitcharts({
    userType: 'individual',
    username: 'jdoyle112',
    chart: 'line',
    xAxisDataType: 'date',
    lineWidth: 3,
    smooth: false
});
```

3. Organization bar chart displaying data grouped by repos with values for *grid* and *hideOnHover*

```js
$('.github-chart').gitcharts({
    userType: 'organization',
    username: 'microsoft',
    chart: 'bar',
    hideOnHover: false,
    grid: false
});
```



## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D



## Copyright

The Gitchart jQuery plugin was written by <a href="jackdoyle.co">Jack Doyle</a> (c) 2017. Feel free to use it as you wish. It's under the MIT license.  