'use strict';

/**
 * Draw live analog clock
 */
class Clock {

  /**
   * The constructor. Add children canvases to param element, draw the clock.
   * @param {HTMLElement} element
   */
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('HTML Element expected.');
    }
    element.style.position = 'relative';
    this.canvasClock = document.createElement('canvas');
    this.canvasClock.setAttribute('width', element.clientWidth + 'px');
    this.canvasClock.setAttribute('height', element.clientHeight + 'px');
    this.canvasClock.style.position = 'absolute';
    this.canvasClock.style.top = 0;
    this.canvasClock.style.left = 0;
    this.canvasClock.style.zIndex = 0;
    element.appendChild(this.canvasClock);

    this.canvasArrows = document.createElement('canvas');
    this.canvasArrows.setAttribute('width', element.clientWidth + 'px');
    this.canvasArrows.setAttribute('height', element.clientHeight + 'px');
    this.canvasArrows.style.position = 'absolute';
    this.canvasArrows.style.top = 0;
    this.canvasArrows.style.left = 0;
    this.canvasArrows.style.zIndex = 1;
    element.appendChild(this.canvasArrows);

    this.contextArrows = this.canvasArrows.getContext('2d');
    this.radius = (this.canvasClock.width / 2) - 10;
    this.centerX = this.canvasClock.width / 2;
    this.centerY = this.canvasClock.height / 2;

    this.drawClock();
    this.drawArrows();
  }

  /**
   * Draw the clock gradient filled circle, digits and marks
   */
  drawClock() {
    const context = this.canvasClock.getContext('2d');

    // Draw gradient filled circle
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    context.strokeStyle = 'rgba(25, 25, 25, 0.8)';
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = context.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      this.radius
    );
    context.fillStyle.addColorStop(0, 'rgba(147, 154, 202, 0.25)');
    context.fillStyle.addColorStop(1, 'rgba(1, 16, 129, 0.8)');
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.fill();
    context.closePath();

    // Draw marks
    context.fillStyle = 'rgba(190, 190, 190, 0.4)';
    for (let i = 0; i < 60; i += 1) {
      context.beginPath();
      context.arc(
        this.centerX + ((this.radius - 60) * Math.cos((-6 * i * (Math.PI / 180)) + (Math.PI / 2))),
        this.centerY - ((this.radius - 60) * Math.sin((-6 * i * (Math.PI / 180)) + (Math.PI / 2))),
        (i % 5 === 0) ? 2 : 1,
        0,
        2 * Math.PI
      );
      context.fill();
      context.closePath();
    }

    // Draw digits
    context.fillStyle = 'rgba(190, 190, 190, 0.8)';
    context.font = 'bold 30px Helvetica, Verdana, Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 4;
    for (let i = 1; i <= 12; i += 1) {
      context.beginPath();
      context.fillText(
        i,
        this.centerX + ((this.radius - 30) * Math.cos((-30 * i * (Math.PI / 180)) + (Math.PI / 2))),
        this.centerY - ((this.radius - 30) * Math.sin((-30 * i * (Math.PI / 180)) + (Math.PI / 2)))
      );
      context.closePath();
    }
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
   * Clear area and draw the arrows.
   * @param {Date} date. Current date is default.
   */
  drawArrows(date = new Date()) {
    // Clear the canvas
    this.contextArrows.clearRect(0, 0, this.canvasArrows.width, this.canvasArrows.height);

    this.contextArrows.shadowOffsetX = 3;
    this.contextArrows.shadowOffsetY = 4;
    this.contextArrows.shadowBlur = 10;
    this.contextArrows.lineCap = 'round';
    this.contextArrows.shadowColor = 'rgba(0, 0, 0, 0.5)';

    // Draw hours arrow
    const hours = 30 * (date.getHours() + ((1 / 60) * date.getMinutes()));
    this.contextArrows.beginPath();
    this.contextArrows.lineWidth = 18;
    this.contextArrows.strokeStyle = 'rgba(25, 25, 25, 0.7)';
    this.contextArrows.moveTo(this.centerX, this.centerY);
    this.contextArrows.lineTo(...this.calcArrowPoint(hours, 100));
    this.contextArrows.stroke();
    this.contextArrows.closePath();

    // Draw minutes arrow
    const minutes = 6 * (date.getMinutes() + ((1 / 60) * date.getSeconds()));
    this.contextArrows.beginPath();
    this.contextArrows.lineWidth = 8;
    this.contextArrows.strokeStyle = 'rgba(25, 25, 25, 0.7)';
    this.contextArrows.moveTo(this.centerX, this.centerY);
    this.contextArrows.lineTo(...this.calcArrowPoint(minutes, 60));
    this.contextArrows.stroke();
    this.contextArrows.closePath();

    // Draw seconds arrow
    const seconds = 6 * (date.getSeconds() + ((1 / 1000) * date.getMilliseconds()));
    this.contextArrows.beginPath();
    this.contextArrows.lineWidth = 2;
    this.contextArrows.strokeStyle = 'rgba(220, 220, 220, 0.7)';
    this.contextArrows.moveTo(this.centerX, this.centerY);
    this.contextArrows.lineTo(...this.calcArrowPoint(seconds, 50));
    this.contextArrows.stroke();
    this.contextArrows.closePath();

    // Draw arraws center
    this.contextArrows.beginPath();
    this.contextArrows.arc(this.centerX, this.centerY, 2, 0, 2 * Math.PI);
    this.contextArrows.fillStyle = 'rgba(220, 220, 220, 1)';
    this.contextArrows.fill();
    this.contextArrows.closePath();

    // SetTimeout for next iteration if clock is working.
    if (this.isWork) {
      setTimeout(() => {
        this.drawArrows.apply(this);
      }, 50);
    }
  }

  /**
   * Start the clock.
   */
  start() {
    this.isWork = true;
    this.drawArrows();
  }

  /**
   * Stop the clock.
   */
  stop() {
    this.isWork = false;
  }

}
