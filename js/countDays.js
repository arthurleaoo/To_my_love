// Data de início do relacionamento
const dataDeInicio = new Date("2024-03-08T03:00:00Z");

// Função para calcular a diferença entre datas
export function dateCount() {
  const agora = new Date();
  const horarioDeBrasilia = new Date(agora.getTime() - 3 * 60 * 60 * 1000); // faz a conversão para o horário de brásilia
  const diferença = horarioDeBrasilia - dataDeInicio;

  // Cálculo de anos, dias, horas, minutos e segundos
  const anos = Math.floor(diferença / (1000 * 60 * 60 * 24 * 365));
  const dias = Math.floor((diferença % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferença % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferença % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferença % (1000 * 60)) / 1000);

  // Atualizando os elementos no DOM
  document.querySelectorAll(".count-item h2")[0].textContent = anos;
  document.querySelectorAll(".count-item h2")[1].textContent = dias;
  document.querySelectorAll(".count-item h2")[2].textContent = horas;
  document.querySelectorAll(".count-item h2")[3].textContent = minutos;
  document.querySelectorAll(".count-item h2")[4].textContent = segundos;
}

// Atualização do contador a cada segundo
setInterval(dateCount, 1000);
