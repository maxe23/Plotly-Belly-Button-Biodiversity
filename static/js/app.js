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