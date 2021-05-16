function dropdownmenu() {
    d3.json("data/samples.json").then(function (data) {
      // console.log(data.names);
      var selData = d3.select('#selDataset');
      var dataNames = data.names;
      dataNames.forEach((x) => {
        selData.append('option').text(x).property('value', x);
      })
      charts(dataNames[0]);
      metatable(dataNames[0]);
  
    })
  }
  function charts(newid) {
  
    d3.json(("data/samples.json").then(function (data) {
      console.log(data.samples);
  
      filterdata = data.samples.filter(x => x.id === newid)
      var sample_values =filterdata[0].sample_values;
      var otu_ids = filterdata[0].otu_ids;
      var otu_labels = filterdata[0].otu_labels;

      var trace1 = {
        x: otu_ids.slice(0, 10).reverse(),
        y: sample_values.slice(0, 10).reverse(),
        type: "bar"
      };
  
      var data1 = [trace1];
  
      var layout1 = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "OTU" },
        yaxis: { title: "OTU Sample Values" }
      };
  
      Plotly.newPlot("bar", data1, layout1);
  
      var trace2 = {
        x: otu_ids,
        y: sample_values,
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      };
  
      var data2 = [trace2];
  
      var layout2 = {
        title: 'Bubble Chart',
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "OTU Sample Values" }
      };
  
      Plotly.newPlot("bubble", data2, layout2);
    });
  
  
  }
  function metatable(newid) {
    d3.json(("data/samples.json").then(function (data) {
      console.log(data.metadata);

      var samplemeta = d3.select('#sample-metadata')
      samplemeta.html('')
      var filterdata = data.metadata.filter(x => x.id == newid)
      
      Object.entries(filterdata[0]).forEach(([key, value]) => {
        var row = samplemeta.append('tr')
        row.append('td').html(key)
        row.append('td').html(value)
      })
    })
  }
  
  
  function optionChanged(newid) {
    charts(newid)
    metatable(newid)
  }
  dropdownmenu()