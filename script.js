let chart;

document.getElementById('calcForm').addEventListener('submit', function (event) {
  event.preventDefault();
  calculate();
});

function calculate() {
  const lrv_PV = parseFloat(document.getElementById('lrv_PV').value);
  const urv_PV = parseFloat(document.getElementById('urv_PV').value);
  const pv = parseFloat(document.getElementById('pv').value);

  const m = 16 / (urv_PV - lrv_PV);
  const b = 4 - m * lrv_PV;

  const mA = m * pv + b;

  document.getElementById('result').textContent = `mA = ${mA.toFixed(2)}`;

  const equationText = `Ecuación: mA = ${m.toFixed(2)} * PV + ${b.toFixed(2)}`;
  document.getElementById('equation').textContent = equationText;

  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [lrv_PV, urv_PV],
      datasets: [{
        label: 'Gráfica de PV vs mA',
        data: [4, 20],
        borderColor: '#3C3729',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: lrv_PV,
          max: urv_PV
        },
        y: {
          type: 'linear',
          position: 'left',
          min: 0,
          max: 20
        }
      }
    }
  });

  document.querySelector('.chart-container').style.display = 'block';
  document.querySelector('canvas').style.display = 'block';
}

function resetValues() {
  document.getElementById('lrv_PV').value = '';
  document.getElementById('urv_PV').value = '';
  document.getElementById('pv').value = '';

  document.getElementById('result').textContent = '';
  document.getElementById('equation').textContent = '';

  document.querySelector('.chart-container').style.display = 'none';
  document.querySelector('canvas').style.display = 'none';

  if (chart) {
    chart.destroy();
  }
}
