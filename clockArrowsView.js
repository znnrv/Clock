class ClockArrowsView {

  /**
   * Set environment and options.
   * @param {CanvasRenderingContext2D} context
   * @param {object} options
   */
  constructor(context, options = {}) {
    const defaultOptions = {
      arrowsLineCap: 'round',
      arrowsShadowColor: 'rgba(10, 10, 10, 1.0)',
      arrowsShadowOffsetX: 4,
      arrowsShadowOffsetY: 4,
      arrowHoursColor: 'rgba(255, 0, 0, 1)',
      arrowHoursWidth: 15,
      arrowHoursOffset: 100,
      arrowMinutesColor: 'rgba(255, 0, 0, 1)',
      arrowMinutesWidth: 10,
      arrowMinutesOffset: 60,
      arrowSecondsColor: 'rgba(255, 255, 255, 1)',
      arrowSecondsWidth: 2,
      arrowSecondsOffset: 50,
      arrowsCenterColor: 'rgba(1, 1, 1, 1)',
    };
    this.context = context;
    this.radius = (this.context.canvas.width / 2) - 10;
    this.centerX = this.context.canvas.width / 2;
    this.centerY = this.context.canvas.height / 2;
    this.options = Object.assign({}, defaultOptions, options);
    this.context.lineCap = this.options.arrowsLineCap;
    this.context.shadowColor = this.options.arrowsShadowColor;
    this.context.shadowBlur = this.options.arrowsShadowBlur;
    this.context.shadowOffsetX = this.options.arrowsShadowOffsetX;
    this.context.shadowOffsetY = this.options.arrowsShadowOffsetY;
  }

  /**
   * Draw the arrows.
   * @param {Date} date
   */
  draw(date) {
    this.clearContext();
    this.drawArrowHours(date);
    this.drawArrowMinutes(date);
    this.drawArrowSeconds(date);
    this.drawArrowCenter();
  }

  /**
   * Calculate position of arrow end.
   * @param {number} value. The current value for the arrow (hours, minutes or seconds).
   * @param {number} offset. The arrow offset to clock radius (arrowLength = clockRadius - offset).
   * @returns {[{number}, {number}]}
   */
  calcArrowPoint(value, offset) {
    return [
      this.centerX + ((this.radius - offset) * Math.cos((Math.PI / 2) - (value * (Math.PI / 180)))),
      this.centerY - ((this.radius - offset) * Math.sin((Math.PI / 2) - (value * (Math.PI / 180))))
    ];
  }

  /**
   * Clear the context.
   */
  clearContext() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Draw the hours arrow.
   * @param {Date} date
   */
  drawArrowHours(date) {
    const hours = 30 * (date.getHours() + ((1 / 60) * date.getMinutes()));
    this.context.beginPath();
    this.context.strokeStyle = this.options.arrowHoursColor;
    this.context.lineWidth = this.options.arrowHoursWidth;
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(...this.calcArrowPoint(hours, this.options.arrowHoursOffset));
    this.context.stroke();
    this.context.closePath();
  }

  /**
   * Draw the minutes arrow.
   * @param {Date} date
   */
  drawArrowMinutes(date) {
    const minutes = 6 * (date.getMinutes() + ((1 / 60) * date.getSeconds()));
    this.context.beginPath();
    this.context.strokeStyle = this.options.arrowMinutesColor;
    this.context.lineWidth = this.options.arrowMinutesWidth;
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(...this.calcArrowPoint(minutes, this.options.arrowMinutesOffset));
    this.context.stroke();
    this.context.closePath();
  }

  /**
   * Draw the seconds arrow.
   * @param {Date} date
   */
  drawArrowSeconds(date) {
    const seconds = 6 * (date.getSeconds() + ((1 / 1000) * date.getMilliseconds()));
    this.context.beginPath();
    this.context.strokeStyle = this.options.arrowSecondsColor;
    this.context.lineWidth = this.options.arrowSecondsWidth;
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(...this.calcArrowPoint(seconds, this.options.arrowSecondsOffset));
    this.context.stroke();
    this.context.closePath();
    if(seconds >= 9 && seconds <= 130){
      document.getElementById("time").hidden=false;
    }
    else{
      document.getElementById("time").hidden=true;
    }
  }


  /**
   * Draw the arrows center.
   */
  drawArrowCenter() {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, 2, 0, 2 * Math.PI);
    this.context.fillStyle = this.options.arrowsCenterColor;
    this.context.fill();
    this.context.closePath();
  }

}
