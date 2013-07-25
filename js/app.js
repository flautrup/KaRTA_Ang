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

function UI(){

  
    $( "#mainwindow" ).sortable({placeholder: "ui-state-highlight", axis: 'y', distance: 100, handle: '.graphheader'});
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

	
	$('#dialogAlert').dialog ('close');
			
    $('#lapselector').hide();
    
    $('#telemetryfile').live('change', handleFileSelect);
}


var KaRTA = angular.module('KaRTA', []);

KaRTA.service('data', function() {
    
    this.getInformation = function() {
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
                        
    }
});

    
/* function handleFileSelect(evt) {

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

		var filecontent=reader.result;
		
		var info=parseInformation(filecontent);
		var data=parseDataFile(filecontent);
		var laps=parseLap(data);
		
		presentInformation(info);
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
        
       //     manipulateID(graphs,"highlight",id);
        
	};

	// Read in the image file as a binary string.
	reader.readAsText(evt.target.files[0]);
}
 
     function parseInformation(content) {
        var rows=content.replace(/[\"\r]/g,"").split("\n");
    
    	var tmpinfo=new information();
    	
    	tmpinfo.format=rows[0].split(",")[1];
    	tmpinfo.venue=rows[1].split(",")[1];
    	tmpinfo.vehicle=rows[2].split(",")[1];
    	tmpinfo.user=rows[3].split(",")[1];
    	tmpinfo.datasource=rows[4].split(",")[1];
    	tmpinfo.comment=rows[5].split(",")[1];
    	tmpinfo.date=rows[6].split(",")[1];
    	tmpinfo.time=rows[7].split(",")[1];
    	tmpinfo.samplerate=rows[8].split(",")[1];
    	tmpinfo.duration=rows[9].split(",")[1];
    	tmpinfo.segment=rows[10].split(",")[1];
    	tmpinfo.beaconmarkers=rows[11].split(",")[1];
    
    	
    	return tmpinfo;
    }

    function parseUnits(content){
    	
    	var rows=content.replace(/[\"\r]/g,"").split("\n");
    	var tmpunits=rows[14].split(",");	
    	
    	var units = [];
    	
    	for (var count=0;count < tmpunits.length; count++) {
    		units.push(tmpunits[count]);
    	}
    	
    	return units;
    	
    }
    
    function parseLap(datastring) {
    
    	var dataobj=JSON.parse(datastring);
    	dataobj.sort(function (a,b) {return a.Time*1000 - b.Time*1000;});
    	var lapcount=0;
    	var laps=[];
    	var start=1;
    	
    	for(var count=1;count<dataobj.length; count++) {
    		if (parseFloat(dataobj[count].Distance)+1<parseFloat(dataobj[count-1].Distance)) {
    			var lapdata={};
    			lapdata.start=start;
    			lapdata.stop=count;
    			lapdata.lap=lapcount;
    			lapdata.laptime=parseFloat(dataobj[count].Time)-parseFloat(dataobj[start].Time);
    			laps[lapcount]=lapdata;
    			start=count+1;
    			lapcount++;
    		}
    	}
    	
        if (dataobj.length > start) {
            var lapdata={};
            lapdata.start=start;
            lapdata.stop=dataobj.length;
            lapdata.lap=lapcount;
            lapdata.laptime=parseFloat(dataobj[dataobj.length-1].Time)-parseFloat(dataobj[start].Time);
            laps[lapcount]=lapdata;
        }
                
    	return laps;
    	
    }

    function parseDataFile(content) {
    	
    	var data = [];
    
    	var rows=content.replace(/[\"\r]/g,"").split("\n");	
            
    	var headings1=rows[13].split(",");
    
    	var headings =[];
    		
    	for (var count=0;count < headings1.length; count++) {
    		headings.push(headings1[count]);
    	}
    	
    
        for (var count=16;count < rows.length; count++) {
    		var dataobj={};
    		var datarow=rows[count].split(",");
    		for (var count2=0; count2<headings.length; count2++) {
    			dataobj[headings[count2]]=datarow[count2];
    		}
    		data.push(dataobj);
    	}
    	
    	var datastring=JSON.stringify(data);
    	
    	return datastring;
    }
 
});*/

