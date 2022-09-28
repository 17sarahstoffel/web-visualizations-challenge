//Test
console.log("This is app.js");

function DrawBargraph(sampleId) {
    //test
    console.log(`DrawBargraph ${sampleId}`);
};

function DrawBubblePlot(sampleId) {
    //test
    console.log(`rawBubblePlot ${sampleId}`);

};

function DrawGage(sampleId) {
    console.log(`DrawGage ${sampleId}`);
};

function ShowMetadata(sampleId) {

    console.log(`ShowMetaData ${sampleId}`);
};

function InitDashboard ()
{
    //test
    console.log('InitDashboard()');

    //Get a handle to the dropdown
    let selector=d3.select("#selDataset");

    let url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    d3.json(url).then(data=> {
        //Test
        console.log(data);

        let sampleNames = data.names;
        //test
        console.log(sampleNames);

        //Populate the dropdwown
        for (let i=0; i<sampleNames.length; i++) {

            let sampleId=sampleNames[i];

            selector.append("option").text(sampleId).property("value", sampleId);
        };

        //Read current value from dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);


        //draw bargraph for id
        DrawBargraph(initialId);

        //draw bubblechart for id
        DrawBubblePlot(initialId);

        //draw gage
        DrawGage(initialId);

        //show metadata for id
        ShowMetadata(initialId);
    });
};
InitDashboard();
