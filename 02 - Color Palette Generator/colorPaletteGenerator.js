let colors = ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6'];

assignColors();
assignColorCodes();

document.querySelectorAll('.js-check-icon').forEach((icon) => {
  icon.style.display = 'none';
});

document.querySelector('.js-generate-button').addEventListener('click', () => {
  generateRandomColors();
  assignColors();
  assignColorCodes();
});

document.querySelectorAll('.js-color').forEach((colorContainer, index) => {
  colorContainer.addEventListener('click', () => {
    copyColor(index);
  });
});

document.querySelectorAll('.js-copy-icon').forEach((icon, index) => {
  icon.addEventListener('click', () => {
    copyColor(index);
  });
});

document.querySelectorAll('.js-color-code').forEach((colorCode, index) => {
  colorCode.addEventListener('click', () => {
    navigator.clipboard.writeText(colors[index]);
  });
});

function assignColors() {
  document.querySelectorAll('.js-color').forEach((colorContainer, index) => {
    colorContainer.style.backgroundColor = colors[index];
  });
}

function assignColorCodes() {
  document.querySelectorAll('.js-color-code').forEach((colorCode, index) => {
    colorCode.innerHTML = `
      ${colors[index]} 
      <span class="copy-icon js-copy-icon">
        <i class="fa-regular fa-copy"></i>
      </span>
    `;
  });

  document.querySelectorAll('.js-copy-icon').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      copyColor(index);
    });
  });
}

function generateRandomColors() {
  const letters = '0123456789ABCDEF';

  for (let i = 0; i < 5; i++) {
    let generatedColor = '#';
    for (let j = 0; j < 6; j++) {
      generatedColor += letters[Math.floor(Math.random() * 16)];
    }
    colors[i] = generatedColor;
  }
}

function copyColor(index) {
  navigator.clipboard.writeText(colors[index]).then(

    document.querySelectorAll('.js-copy-icon').forEach((icon, iconIndex) => {
      if (index === iconIndex) {
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';

        setTimeout(() => {
          icon.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
      }
    })
  );
}