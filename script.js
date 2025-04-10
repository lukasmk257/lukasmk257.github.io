let chart;

document.getElementById('calcForm').addEventListener('submit', function (event) {
  event.preventDefault();
  calculate();
});

function calculate() {
  const lrv = parseFloat(document.getElementById('lrv_PV').value);
  const urv = parseFloat(document.getElementById('urv_PV').value);
  const pv = parseFloat(document.getElementById('pv').value);

  const result = document.getElementById('result');
  const equation = document.getElementById('equation');

  if (isNaN(lrv) || isNaN(urv) || isNaN(pv)) {
    result.textContent = 'Por favor, completa todos los campos correctamente.';
    return;
  }

  if (urv === lrv) {
    result.textContent = 'URV_PV y LRV_PV no pueden ser iguales.';
    return;
  }

  const percent = (100 / (urv - lrv)) * (pv - lrv);
  const mA = (16 / 100) * percent + 4;

  result.innerHTML = `
    • PV del instrumento: <strong>${percent.toFixed(2)}%</strong><br>
    • mA equivalentes: <strong>${mA.toFixed(2)} mA</strong>
  `;

  equation.innerHTML = `
    Fórmula: mA = ((16 / 100) * ${percent.toFixed(2)}) + 4 = ${mA.toFixed(2)} mA
  `;

  // Gráfico
  const points = [];
  const labels = [];
  for (let i = 0; i <= 100; i += 5) {
    labels.push(i + '%');
    points.push(((16 / 100) * i + 4).toFixed(2));
  }

  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'mA vs % del proceso',
        data: points,
        borderColor: 'rgba(0, 255, 255, 1)',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        fill: true,
        tension: 0.1,
        pointRadius: 2,
      }]
    },
    options: {
      scales: {
        y: {
          title: { display: true, text: 'Corriente (mA)' },
          min: 4,
          max: 20
        },
        x: {
          title: { display: true, text: '% del proceso' }
        }
      }
    }
  });

  document.querySelector('.chart-container').style.display = 'block';
}

function resetValues() {
  document.getElementById('lrv_PV').value = '';
  document.getElementById('urv_PV').value = '';
  document.getElementById('pv').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('equation').textContent = '';
  document.querySelector('.chart-container').style.display = 'none';
  if (chart) chart.destroy();
}
