window.addEventListener('load', function () {

  const matrix = document.getElementById('canvas');
  const ctx = matrix.getContext('2d');
  const controlsPanel = document.getElementById('controls_panel');
  const initialSizeControl = document.getElementById('initialSize');
  const imageSources = {
    4: cubes.flat(Infinity),
    32: codewars.flat(Infinity),
    256: '../codejam-canvas/assets/imgs/image.png',
    };


  // Перевод данных из HEX в RGBA
  const convertToRgba = function (str) {
		let result = [];	

    for (let i = 0; i < 6; i += 2) {
			let sub = str.slice(i, i + 2);
			result.push(parseInt(sub, 16));
		}	
    result.push(255);
		return result;
	};


  // Отрисовка изображений 
  const drawImage = function (size) {
    let source = imageSources[size];
  	let newImageData = ctx.createImageData(matrix.width, matrix.height);

    if (typeof source === 'string') {
      let img = new Image(); 
        
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };
      img.src = source;
      return
    } else if (typeof source[0] === 'string') {
      source = source.map(el => convertToRgba(el)).flat();
    };

    for (let i = 0; i < newImageData.data.length; i++) {
      newImageData.data[i] = source[i];
    }
  	ctx.putImageData(newImageData, 0, 0);
  };



  // Обработчик контроллов
	const controlsPanelHandler = function (evt) {
    let target = evt.target;

    if (target.tagName !== 'INPUT') {
      return
    };
		
    let size = parseInt(target.value);

		ctx.clearRect(0, 0, matrix.width, matrix.height);
		matrix.width = size;
    matrix.height = size;
		drawImage(size);
	};


	matrix.width = 4;
	matrix.height = 4;
	controlsPanel.addEventListener('click', controlsPanelHandler);
	initialSizeControl.click();

});
