class ClockFaceView {

  /**
   * Set environment and options.
   * @param {CanvasRenderingContext2D} context
   * @param {object} options
   */
  constructor(context, options = {}) {
    const defaultOptions = {
      faceBorderColor: 'rgba(1, 1, 1, 1)',
      faceBorderWidth: 1,
      faceCenterColor: 'rgba(255, 255, 255, 1)',
      faceEdgeColor: 'rgba(1, 1, 1, 1)',
      faceShadowColor: 'rgba(0, 0, 0, 0.5)',
      faceShadowOffsetX: 5,
      faceShadowOffsetY: 5,
      digitsColor: 'rgba(255, 255, 255, 1)',
      digitsFont: 'bold 30px Helvetica, Verdana, Times New Romans, sans-serif',
      digitsShadowColor: 'rgba(0, 0, 0, 0.5)',
      digitsShadowOffsetX: 2,
      digitsShadowOffsetY: 2,
      digitsOffset: 30,
      marksColor: 'rgba(255, 0, 0, 1)',
      marksOffset: 60,
      marksOtherRadius: 2,
      marksDigitsRadius: 4,
    };
    this.context = context;
    this.radius = (this.context.canvas.width / 2) - 10;
    this.centerX = this.context.canvas.width / 2;
    this.centerY = this.context.canvas.height / 2;
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * Draw clock face
   */
  draw() {
    this.drawCircle();
    this.drawMarks();
    this.drawDigits();
  }

  /**
   * Draw gradient filled circle
   */
  drawCircle() {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.context.strokeStyle = this.options.faceBorderColor;
    this.context.lineWidth = this.options.faceBorderWidth;
    this.context.stroke();
    this.context.fillStyle = this.context.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      this.radius
    );
    this.context.fillStyle.addColorStop(0, this.options.faceCenterColor);
    this.context.fillStyle.addColorStop(1, this.options.faceEdgeColor);
    this.context.shadowBlur = this.options.faceShadowBlur;
    this.context.shadowColor = this.options.faceShadowColor;
    this.context.shadowOffsetX = this.options.faceShadowOffsetX;
    this.context.shadowOffsetY = this.options.faceShadowOffsetY;
    this.context.fill();
    this.context.closePath();
  }

  /**
   * Draw marks
   */
  drawMarks() {
    const radius = this.radius - this.options.marksOffset;
    this.context.fillStyle = this.options.marksColor;
    this.context.shadowBlur = this.options.digitsShadowBlur;
    this.context.shadowColor = this.options.digitsShadowColor;
    this.context.shadowOffsetX = this.options.digitsShadowOffsetX;
    this.context.shadowOffsetY = this.options.digitsShadowOffsetY;

    for (let i = 0; i < 60; i += 1) {
      this.context.beginPath();
      this.context.arc(
        this.centerX + (radius * Math.cos((-6 * i * (Math.PI / 180)) + (Math.PI / 2))),
        this.centerY - (radius * Math.sin((-6 * i * (Math.PI / 180)) + (Math.PI / 2))),
        (i % 5 === 0) ? this.options.marksDigitsRadius : this.options.marksOtherRadius,
        0,
        2 * Math.PI
      );
      this.context.fill();
      this.context.closePath();
    }
  }

  /**
   * Draw digits
   */
  drawDigits() {
    const radius = this.radius - this.options.digitsOffset;
    this.context.fillStyle = this.options.digitsColor;
    this.context.font = this.options.digitsFont;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.shadowBlur = this.options.digitsShadowBlur;
    this.context.shadowColor = this.options.digitsShadowColor;
    this.context.shadowOffsetX = this.options.digitsShadowOffsetX;
    this.context.shadowOffsetY = this.options.digitsShadowOffsetY;

    for (let i = 1; i <= 12; i += 1) {
      this.context.beginPath();
      this.context.fillText(
        i,
        this.centerX + (radius * Math.cos((-30 * i * (Math.PI / 180)) + (Math.PI / 2))),
        this.centerY - (radius * Math.sin((-30 * i * (Math.PI / 180)) + (Math.PI / 2)))
      );
      this.context.closePath();
    }
  }

}
