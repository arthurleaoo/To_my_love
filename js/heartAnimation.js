// Função para gerar um número aleatório entre dois valores
const randomNum = (x, y) => {
  x = parseInt(x);
  y = parseInt(y);
  return Math.floor(Math.random() * (y - x + 1)) + x;
};

// Função para criar a animação de coraçõeszinhos
export const heartAnimation = () => {
  const effectText = document.querySelector(".text-effect");
  if (!effectText) return;

  const heartCount = (effectText.offsetWidth / 50) * 5;

  for (let i = 0; i < heartCount; i++) {
    const heartSize = randomNum(60, 120) / 10;

    const heart = document.createElement("span");
    heart.classList.add("tiny-heart");

    // Define os estilos inline para o coração
    heart.style.top = `${randomNum(40, 80)}%`;
    heart.style.left = `${randomNum(0, 100)}%`;
    heart.style.width = `${heartSize}px`;
    heart.style.height = `${heartSize}px`;
    heart.style.animationDelay = `-${randomNum(0, 3)}s`;
    heart.style.animationDuration = `${randomNum(2, 5)}s`;

    // Adiciona o coração ao container
    effectText.appendChild(heart);
  }
};
