window.addEventListener("load", function() {
  const matrix = document.getElementById("canvas");
  const ctx = matrix.getContext("2d");
  const controlsPanel = document.getElementById("controls_panel");
  const initialSizeControl = document.getElementById("initialSize");
  const imageSources = {
    4: cubes,
    32: codewars,
    256: "../codejam-canvas/assets/imgs/image.png"
  };

  // Перевод данных из HEX в RGBA
  const convertToRgba = function(arr) {
    let input = arr.flat(Infinity);
    let output = [];

    if (typeof input[0] === "number") {
      return input;
    }

    input.forEach(el => {
      let newElement = [];
      for (let i = 0; i < 6; i += 2) {
        let sub = el.slice(i, i + 2);
        newElement.push(parseInt(sub, 16));
      }
      newElement.push(255);
      output.push(newElement);
    });

    return output.flat();
  };

  // Отрисовка изображений
  const drawImage = function(size, src) {
    let newImageData = ctx.createImageData(matrix.width, matrix.height);

    if (typeof src === "string") {
      let img = new Image();

      img.onload = function() {
        ctx.drawImage(img, 0, 0);
      };

      img.src = src;
      return;
    } else {
      src = convertToRgba(src);
    }

    for (let i = 0; i < newImageData.data.length; i++) {
      newImageData.data[i] = src[i];
    }

    ctx.putImageData(newImageData, 0, 0);
  };

  // Обработчик контроллов
  const controlsPanelHandler = function(evt) {
    let target = evt.target;

    if (target.tagName !== "INPUT") {
      return;
    }

    let size = parseInt(target.value);

    ctx.clearRect(0, 0, matrix.width, matrix.height);
    matrix.width = size;
    matrix.height = size;
    drawImage(size, imageSources[size]);
  };

  controlsPanel.addEventListener("click", controlsPanelHandler);
  initialSizeControl.click();
});
