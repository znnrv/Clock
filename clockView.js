class ClockView {

  constructor(element, options = {}) {
    this.element = element;
    const faceView = new ClockFaceView(this.createCanvas(0), options);
    const arrowsView = new ClockArrowsView(this.createCanvas(1), options);
    this.drawFace = faceView.draw.bind(faceView);
    this.drawArrows = arrowsView.draw.bind(arrowsView);
  }

  createCanvas(zIndex = 0) {
    if (!(this.element instanceof HTMLElement)) {
      throw new TypeError('HTML Element expected.');
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this.element.clientWidth}px`);
    canvas.setAttribute('height', `${this.element.clientHeight}px`);
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = zIndex;
    this.element.appendChild(canvas);

    return canvas.getContext('2d');
  }

}
