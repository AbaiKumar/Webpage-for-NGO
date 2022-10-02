// SIDEBAR TOGGLE
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var barData = [];
var curveData = [];
var count = 0,total = 0;

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

function display_Curvechart() {
  
// AREA CHART
var areaChartOptions = {
  series: [{
    name: 'Funds',
    data: curveData
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Funds',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();
}

function display_Barchart() {
// BAR CHART
var barChartOptions = {
  series: [{
    data: barData
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    },
  },
  colors: [
    "#246dec",
    "#cc3c43",
    "#367952",
    "#f5b74f",
    "#4f35a1"
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ["Fund 1", "Fund 2", "Fund 3", "Fund 4", "Fund 5"],
  },
  yaxis: {
    title: {
      text: "Count"
    }
  }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();
}

function update() {
  curveData.forEach(x => {
    total += parseInt(x);
  });
  $("#total").text("₹"+total);
}

$(document).ready(function() {
  
    function data(value) {

      $.get("https://abai-194101.000webhostapp.com/data_fetch.php?type=" +value, function(data, status){
        if(value == 1) {
          barData = data.split(" ");
          count = barData.pop();
          display_Barchart();
        }
        if(value == 2) {
          curveData = data.split(" ");
          display_Curvechart();
          update();
        }
      });
    }
    data(1);
    data(2);

    function list(value) {
      $.get("https://abai-194101.000webhostapp.com/counter.php?type=" +value, function(data, status){
        if(value == 1) {
          $("#fund").text(data);
        }
        if(value == 2) {          
          $("#donors").text(data);
        }
      });
    }
    list(1);
    list(2);
  });
