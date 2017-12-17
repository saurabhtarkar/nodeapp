function is_valid(){
	$.ajax({
          	type: 'GET',
          	url: "graphs/valid_vs_invalid.php",
          	contentType: "application/json",
          	dataType: 'json',
          	success: function(json) {

             		console.log("chart1");
	             	console.log(json);
            		var data = {};
            		var sites = [];
	        	json.forEach(function(e) {
         			sites.push(e.verified);
        			data[e.verified] = e.count;
         		})
         		console.log(sites);
        		console.log([data]);
       			
			var chart = c3.generate({
          			data: {
					type: 'pie',
                			size: {
                     				width: 600,
                     				height: 300
                 			},
                			json:[ data ],
                			keys: {
                  				value: sites,
                			},
                 			labels: true,
                 			names:{
                  				0: 'InValid',
                  				1:'Valid',
                  				2:'Not Verified'
                			},
                 			colors: {
                    				0: '#708090',
                    				1: '#008000',
                    				2: ' #FFA500'
        				},
               			},
            			padding: {
               				left : 50
               			},
            			tooltip: {
                			grouped: false // Default true
                      		},
            			legend: {
               				position: 'right'
              			},
          			bindto: '#chart1'
        		});
               	}.bind(this),
          	error: function(e){
            		console.log("e");
             	}.bind(this)
      	});
}
is_valid();

