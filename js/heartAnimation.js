// Função para o efeito de digitação
export function typeText(element, text, speed, callback) {
  let index = 0;
  // Criação do cursor
  const cursor = document.createElement("span");
  cursor.textContent = "|";
  cursor.style.cssText = `
  display: inline-block;
  margin-left: 5px;
  color: inherit;
  animation: blink 0.8s steps(1) infinite;
`;
  element.appendChild(cursor);

  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent = text.slice(0, index + 1); // Atualiza o texto dinamicamente
      element.appendChild(cursor); // Reanexa o cursor ao final
      index++;
    } else {
      clearInterval(interval);

      if (callback) callback(); // Chama a animação dos corações após o texto ser concluído
    }
  }, speed);
}

// Função para gerar um número aleatório entre dois valores
const randomNum = (x, y) => {
  x = parseInt(x);
  y = parseInt(y);
  return Math.floor(Math.random() * (y - x + 1)) + x;
};

// Animação dos corações
export const heartAnimation = () => {
  const effectText = document.querySelector(".text-effect");
  const heartCount = (effectText.offsetWidth / 50) * 5;

  for (let i = 0; i < heartCount; i++) {
    const heartSize = randomNum(60, 120) / 10;

    const heart = document.createElement("span");
    heart.classList.add("tiny-heart");

    // Define os estilos para o coração
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
