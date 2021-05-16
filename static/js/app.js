// Create a function to grab Demo Info
function getDemoInfo(id) {
    d3.json("static/js/data/samples.json"). then ((data) => {
        var metadata = data.metadata
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id) [0]

        var demographicInfo = d3.select("#sample-metadata")
        demographicInfo.html("")

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h6").text(key[0].toUpperCase() + ":" + key[1] + "\n")
        })
    })
}

// build plots
function buildPlots (id) {
    d3.json("static/js/data/samples.json"). then ((data) => {
        console.log(data)
        // Filter the data to get the sample's OTU data
        var filtData = data.samples;
        var sampleDict = filtData.filter(item => item.id == id)[0];
        var sampleValues = sampleDict.sample_values; 
        var idValues = sampleDict.otu_ids;
        var barLabels = idValues.slice(0, 10).reverse();
        var newLabels = [];
        barLabels.forEach((label) => {
            newLabels.push("OTU " + label);
        });
        var hovertext = sampleDict.otu_labels;

        // Create horizontal bar chart
        var trace1 = {
            x: sampleValues.slice(0,10).reverse(),
            y: newLabels,
            type: "bar",
            orientation: "h",
            marker: {
                color: "blue"