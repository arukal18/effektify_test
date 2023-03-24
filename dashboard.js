const apiUrl = 'https://platform-staging.effektify.com/api/v1/inhouse/statistics';
const apiKey = '4313BAD127DEB8C8C2494181BA547';

fetch(apiUrl, {
  headers: {'Authorization': `Bearer ${apiKey}`}
})
.then(response => response.json())
.then(data => {
  const metrics = data.metrics;
  console.log(JSON.stringify(metrics));

  // Create an object that maps metric keys to their corresponding chart IDs
  const chartIds = {
    'users': 'usersChart',
    'accounts': 'accountsChart',
    'integrations': 'integrationsChart'
    // Add additional keys and IDs here as needed
  };

  // Loop through each metric and create a chart for it
  metrics.forEach(metric => {
    const key = metric.key;
    const values = metric.values;
    const chartId = chartIds[key];

    // Create the chart using Chart.js
    const chart = new Chart(chartId, {
      type: 'line',
      data: {
        labels: [values.time],
        datasets: [{
          label: metric.description,
          data: [values.value],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
});
