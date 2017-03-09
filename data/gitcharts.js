function getGithubApiData(url, element, chart, chartOptions, xAxisDataType){
    var events = [];
    $.getJSON(url, function(data) {
        $.each(data, function(i, obj){
            for (var key in obj) {
                if(key == "type"){
                    if(obj[key] == "PushEvent"){
                        events.push(obj);
                    }
                }
            }
        });

    }).done(function(){

        var eventsData = getEventData(events, xAxisDataType);
        if(!eventsData){
            return;
        }

        if(chart == 'donut'){
            createDonutChart(element, eventsData, chartOptions);
        } else if(chart == 'line'){
            createLineChart(element, eventsData, chartOptions);
        } else if(chart == "bar"){
            createBarChart(element, eventsData, chartOptions);
        }

    });
}



function getEventData(eventsObj, xAxisDataType){
    // need to get repo title, number of commits, date, and user
    var eventsData = [];

    for(var i in eventsObj){

        var repoName = "";
        var numCommits = "";
        var commitDate = "";
        var userDisplayName = "";
        var userPhoto = "";

        for(var key in eventsObj[i]){

            if(key == "repo"){

                repoName = getRepoDetails(eventsObj[i][key]);
            }

            if(key == "payload"){

                numCommits = getNumCommits(eventsObj[i][key]);

                //userDisplayNames = getUserInfo(eventsObj[i][key]);
            }

            if(key == "created_at"){
                commitDate = eventsObj[i][key];
                
                commitDate = commitDate.split('T')[0];
            }

        }

        if(repoName != "" && numCommits != ""){

            // parse the repo name
            var repoName = parseRepoName(repoName);
            // check if repo already exists
            var found = checkIfAlreadyExistsInArray(eventsData, repoName, numCommits, commitDate);
            if(!found){
                
                if(xAxisDataType == 'date'){

                    createDateDataObject(eventsData, commitDate, numCommits);

                } else if(xAxisDataType == 'repos'){

                    createReposDataObject(eventsData, repoName, numCommits);

                } else {
                    return;
                }

            }
        }
    }

    return eventsData;
}


function createDateDataObject(eventsData, commitDate, numCommits){
    
    eventsData.push({
        label: commitDate,
        value: numCommits
    });

}

function createReposDataObject(eventsData, repoName, numCommits){

    eventsData.push({
        label: repoName,
        value: numCommits
    });

}


function checkIfAlreadyExistsInArray(eventsData, repoName, numCommits, commitDate){
    var found = false;
    eventsData.some(function(el){
        if (el.label == repoName){
            found = true;
            var currentCommits = el.value;
            var newCommits = currentCommits + numCommits;
            el.value = newCommits;
        } else if(el.label == commitDate){
            found = true;
            var currentCommits = el.value;
            var newCommits = currentCommits + numCommits;
            el.value = newCommits;
        }
    });
    return found;
}


function getUserInfo(payloadObj){

    var authorsArray = [];
    
    for(var val in payloadObj){

        if(val == "commits"){
            for(var i = 0; i < payloadObj[val].length; i++){
                for(var x in payloadObj[val][i]){
                    if(x == "author"){
                        // commit author info
                       authorsArray.push(payloadObj[val][i][x]['name']);
                    }
                }
            }
        }
    }

    return authorsArray;
}


function parseRepoName(repoName){
    var slashIndex = repoName.indexOf("/");
    var newRepoName = repoName.slice(slashIndex + 1);
    return newRepoName;
}


function getRepoDetails(repoObj){
    for(var val in repoObj){
        if(val == "name"){
            return repoObj[val];
        }
    }
}

function getNumCommits(payloadObj){
    for(var val in payloadObj){
        if(val == "size"){
            return payloadObj[val];
        }
    }
}


function createDonutChart(element, eventsData, chartOptions){

    Morris.Donut({
        element: element,
        data: eventsData,
        colors: chartOptions.colors,
        resize: chartOptions.resize
    });

}


function createLineChart(element, eventsData, chartOptions){

    Morris.Line({
        element: element,
        data: eventsData,
        xkey: 'label',
        ykeys: ['value'],
        labels: ['Commits'],
        xLabels: ['day'],
       // parseTime: false,
        lineColors: chartOptions.colors,
        lineWidth: chartOptions.lineWidth,
        pointSize: chartOptions.pointSize,
        pointFillColors: chartOptions.pointFillColors,
        smooth: chartOptions.smooth,
        hideHover: chartOptions.hideOnHover,
        grid: chartOptions.grid,
        xLabelFormat: function(x){
            return (x.getMonth() + 1) + "/" + x.getDate();
        }
    });

}


function createBarChart(element, eventsData, chartOptions){

    Morris.Bar({
        element: element,
        data: eventsData,
        xkey: 'label',
        ykeys: ['value'],
        labels: ['Commits'],
        xLabels: ['day'],
        barColors: chartOptions.barColors,
        grid: chartOptions.grid,
        hideHover: chartOptions.hideHover,
        resize: chartOptions.resize,
    });

}


function buildApiUrl(userType, username, organization){

    var rootUrl = "https://api.github.com/";

    if(userType == 'individual'){
        if(username){
            var url = buildUserUrl(username, rootUrl);
        } else {    
            return;
        }
        
    } else if(userType == 'organization'){
        if(organization){
            var url = buildOrgUrl(organization, rootUrl);
        } else {
            return
        }

    } else {
        return;
    }

    return url;
}


function buildUserUrl(username, rootUrl){

    var eventType = "users";
    var url = rootUrl + eventType + "/" + username + "/events";
    return url;
}

function buildOrgUrl(organization, rootUrl){
    console.log("")
    var eventType = "orgs";
    var url = rootUrl + eventType + "/" + organization + "/events";
    return url;    
}


function createChartOptions(chart, colors, grid, hideOnHover, resizeChart, lineWidth, pointSize, pointFillColors, smooth){

    if(!pointFillColors){
        pointFillColors = colors;
    }

    if(chart == 'donut'){

        var chartOptions = {
            colors: colors,
            resize: resizeChart
        }

    } else if(chart == 'line'){

        var chartOptions = {
            colors: colors,
            lineWidth: lineWidth,
            pointSize: pointSize,
            pointFillColors: pointFillColors,
            smooth: smooth,
            hideHover: hideOnHover,
            grid: grid
        }

    } else if(chart == 'bar'){

        var chartOptions = {
            barColors : colors,
            hideHover : hideOnHover,
            grid      : grid,
            resize    : resizeChart
        }

    } else {
        return;
    }

    return chartOptions;

}



(function($){

    $.fn.gitcharts = function( options ){

        var settings = $.extend({
            userType        : 'individual',
            xAxisDataType   : 'repos',
            username        : null,
            organization    : null,
            chart           : 'donut',
            colors          : ['#097054', '#ffde00', '#6599ff', '#ff9900'],
            grid            : true,
            hideOnHover     : true,
            lineWidth       : 2,
            pointSize       : 4,
            pointFillColors : "",
            smooth          : true,
            resize          : false
        }, options);
        $this = $(this);

        return this.each(function(){

            var url = buildApiUrl(settings.userType, settings.username, settings.organization);
            if(!url){
                return;
            }

            var chartOptions = createChartOptions(settings.chart, settings.colors, settings.grid, settings.hideOnHover, settings.resize, settings.lineWidth, settings.pointSize, settings.pointFillColors, settings.smooth);

            getGithubApiData(url, this, settings.chart, chartOptions, settings.xAxisDataType);

        });

    }

})(jQuery);

    




