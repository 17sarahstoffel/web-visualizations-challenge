//Creating the varable for the url
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//creating the function for drawing the bargraph
function DrawBargraph(sampleId) {
    
    d3.json(url).then(data=> {

        let samples=data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels= result.otu_labels;
        let sample_values = result.sample_values;

        //create trace object
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`),
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        };

        //trace => array
        let barArray = [barData];

        //layout object
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150},
        };

        //Plotly function
        Plotly.newPlot("bar", barArray, barLayout);

    });

};
//creating a function to draw the bubble plot
function DrawBubblePlot(sampleId) {
    
    d3.json(url).then(data=> {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0]

        let otu_ids = result.otu_ids;
        let otu_labels= result.otu_labels;
        let sample_values = result.sample_values;

        //create trace object
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
            
        };

        //trace => array
        let bubbleArray = [bubbleData];

        //layout object
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        //Plotly function
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });

};


// Create a function that will display the sample metadata
function ShowMetadata(sampleId) {

    d3.json(url).then(data => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let display = d3.select("#sample-metadata");
        display.html("");

        Object.entries(result).forEach(([key,value])=> {
            display.append("h6").text(`${key}: ${value}`);
        });    

    });

};

//Creating an event handler for when the number in the dropdown changes
function optionChanged(sampleId) {

    DrawBargraph(sampleId);
    DrawBubblePlot(sampleId);
    ShowMetadata(sampleId);

};


// Creating a function that will make the dashboard
function InitDashboard ()
{
    //Get a handle to the dropdown
    let selector=d3.select("#selDataset");

    d3.json(url).then(data=> {
    
        let sampleNames = data.names;

        //Populate the dropdwown
        for (let i=0; i<sampleNames.length; i++) {

            let sampleId=sampleNames[i];

            selector.append("option").text(sampleId).property("value", sampleId);
        };

        //Read current value from dropdown
        let initialId = selector.property("value");

        //draw bargraph for id
        DrawBargraph(initialId);

        //draw bubblechart for id
        DrawBubblePlot(initialId);

        //show metadata for id
        ShowMetadata(initialId);
    });
};
InitDashboard();
