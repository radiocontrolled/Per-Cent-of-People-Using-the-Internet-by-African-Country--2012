var w = window.innerWidth/1.2;
var h = window.innerHeight/1.2;

var projection = d3.geo.mercator();
    projection.scale([w/3]).translate([w/4,h/2])

var path = d3.geo.path().projection(projection);

var svg = d3.select("article")
	.append("svg")
	.attr({
		width: w, 
		height: h
	})
	
var color = d3.scale.quantize()
    .range(['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,52,148)'])
    .domain([0.80, 55.00]); 
	
d3.json("Africa.json", function(json){
	d3.csv("PercentageOfIndividualsUsingTheInternet.csv",function(csv){
	
               
		for(var j = 0; j < csv.length; j++){
			for(var i = 0; i < json.features.length; i++){
					if(json.features[i].properties.name == csv[j].Country){
						//bind the per cent data into the geo json
						json.features[i].properties.perCent = csv[j].Value;
						
						break;
					}				
				}
			}
	

		var map = svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", function(d) {
               	  var value = d.properties.perCent;
                   		if (value) { return color(value); }
                        else { return "#ffffff"; }
                   })
			.on("mouseover", function(d){			
				d3.select("#tooltip")
					.select("#perCent").append("text")
					.text(function(){
						return d.properties.name + ", " + d.properties.perCent + "%";
					})
			})
			.on("mouseout",function(d){
				d3.select("#tooltip text").remove();
				
			})
	})
		
})
	
	

