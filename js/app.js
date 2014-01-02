//Global variables

/*var app = angular.module('beta', [], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/partials/home',
    controller: HomeController
  });
  // When you put /home, it also automatically handles /home/ as well
   $routeProvider.otherwise( { redirectTo: '/'} );
  
  // configure html5 to get links working
  // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
  $locationProvider.html5Mode(true);
});*/


//JQuery bootstrapping UI
function UI() {


    $("#mainwindow").sortable({
        placeholder: "ui-state-highlight",
        axis: 'y',
        distance: 100,
        handle: '.graphheader'
    });
    // $( "#mainwindow" ).disableSelection();


    // Tabs
    $('#tabs').tabs();
    //Fx error on resizable before init
    //$('#tabs').resizable("aspectRatio");

    //$('#mapcontainer').resizable("aspectRatio");


    // Dialog			
    $('#dialogAlert').dialog({
        autoOpen: true,
        width: 600,
        buttons: {
            "Ok": function() {
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });


    $('#dialogAlert').dialog('close');

    $('#lapselector').hide();

    // $('#telemetryfile').live('change', handleFileSelect);
}

//Angular

var KaRTA = angular.module('KaRTA', []);

KaRTA.directive('fileChange', [
    function() {
        return {
            link: function(scope, element, attrs) {
                element[0].onchange = function() {
                              scope[attrs['fileChange']](element[0])

                }
            }
            
        }
    }
])

//Services

KaRTA.service('data', function() {
    var info;
    var data;
    var laps;
    
    
    //Read content
    function abortRead() {
        reader.abort();
    }

    function errorHandler(evt) {
        switch (evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        case evt.target.error.SECURITY_ERR:
            alert('Security Error');
            break;
        default:
            alert('An error occurred reading this file.');
        };
    }

    this.loadFileContent= function(filetoload) {
        var self=this;
        var reader;

        reader = new FileReader();
        reader.onerror = errorHandler;
        reader.onabort = function(e) {
            alert('File read cancelled');
        };
        reader.onloadstart = function(e) {

        };
        reader.onload = function(e) {

            $('#dialogAlert').append('<h1>File Loaded</h1>');
            $('#dialogAlert').dialog("open");

            var filecontent = reader.result;

            info=self.parseInformation(filecontent);
    	    data=self.parseDataFile(filecontent);
		    laps=self.parseLap(data);
		/*
		//presentInformation(info);
        $('#lapselector').show();
		presentLaps(laps);
        
		//speedGraph(data,laps);
        var speedgraph=analysisGraph('speedgraph','Speed',data,laps,20);
        var accelgraph=analysisGraph('accelgraph','LonAcc',data,laps,1);
        var steergraph=analysisGraph('steergraph','Steer',data,laps,20);           
        var throttlegraph=analysisGraph('throttlegraph','Throttle',data,laps,20);
        var breakgraph=analysisGraph('brakegraph','Brake',data,laps,20);
		
		var mapgraph=map('map',data,laps);
        
        Graphs=[speedgraph, accelgraph, steergraph, throttlegraph, breakgraph, mapgraph];
        
        // on event triggered change graphs
        
       //     manipulateID(graphs,"highlight",id);*/

        };

        // Read in the image file as a binary string.
        reader.readAsText(filetoload);
    };
    
    this.parseInformation = function(content) {
        var rows = content.replace(/[\"\r]/g, "").split("\n");

        var tmpinfo = {
            format: rows[0].split(",")[1],
            venue: rows[1].split(",")[1],
            vehicle: rows[2].split(",")[1],
            user: rows[3].split(",")[1],
            datasource: rows[4].split(",")[1],
            comment: rows[5].split(",")[1],
            date: rows[6].split(",")[1],
            time: rows[7].split(",")[1],
            samplerate: rows[8].split(",")[1],
            duration: rows[9].split(",")[1],
            segment: rows[10].split(",")[1],
            beaconmarkers: rows[11].split(",")[1]
        };
        return tmpinfo;


    }

    this.ParseUnits = function(content) {

        var rows = content.replace(/[\"\r]/g, "").split("\n");
        var tmpunits = rows[14].split(",");

        var units = [];

        for (var count = 0; count < tmpunits.length; count++) {
            units.push(tmpunits[count]);
        }

        return units;
    };

    this.parseDataFile = function(content) {

        var data = [];

        var rows = content.replace(/[\"\r]/g, "").split("\n");

        var headings1 = rows[13].split(",");

        var headings = [];

        for (var count = 0; count < headings1.length; count++) {
            headings.push(headings1[count]);
        }


        for (var count = 16; count < rows.length; count++) {
            var dataobj = {};
            var datarow = rows[count].split(",");
            for (var count2 = 0; count2 < headings.length; count2++) {
                dataobj[headings[count2]] = datarow[count2];
            }
            data.push(dataobj);
        }

        var datastring = JSON.stringify(data);

        return datastring;
    };

    this.parseLap= function(datastring) {

        var dataobj = JSON.parse(datastring);
        dataobj.sort(function(a, b) {
            return a.Time * 1000 - b.Time * 1000;
        });
        var lapcount = 0;
        var laps = [];
        var start = 1;

        for (var count = 1; count < dataobj.length; count++) {
            if (parseFloat(dataobj[count].Distance) + 1 < parseFloat(dataobj[count - 1].Distance)) {
                var lapdata = {};
                lapdata.start = start;
                lapdata.stop = count;
                lapdata.lap = lapcount;
                lapdata.laptime = parseFloat(dataobj[count].Time) - parseFloat(dataobj[start].Time);
                laps[lapcount] = lapdata;
                start = count + 1;
                lapcount++;
            }
        }

        if (dataobj.length > start) {
            var lapdata = {};
            lapdata.start = start;
            lapdata.stop = dataobj.length;
            lapdata.lap = lapcount;
            lapdata.laptime = parseFloat(dataobj[dataobj.length - 1].Time) - parseFloat(dataobj[start].Time);
            laps[lapcount] = lapdata;
        }

        return laps;

    }

    this.getInformation = function() {
        return info;
    }
    
    /*this.getInformation = function() {
            var info= { format: "Test",
                        venue: "Test",
                        vehicle: "Test",
                        user: "Test",
                        datasource: "Test",
                        comment: "Test",
                        date: "Test",
                        time: "Test",
                        samplerate: "Test",
                        duration: "Test",
                        segment: "Test",
                        beaconmarkers: "Test"};
            
            return info;
                        
    }*/
});
