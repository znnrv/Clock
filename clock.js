class Clock {
  /**
   * The constructor. Add children canvases to param element, draw the clock.
   * @param {HTMLElement} element
   * @param {object} options
   */
  constructor(element, options = {}) {
    this.isWork = ('isWork' in options) ? !!options.isWork : true;
    this.view = new ClockView(element, options);
    this.view.drawFace();
    this.update();
  }

  /**
   * Returns the current date object.
   * @returns {Date}
   */
  static getCurrentDate() {
    return new Date();
  }

  /**
   * Update time on the clock.
   */
  update() {
    this.view.drawArrows(Clock.getCurrentDate());
    // SetTimeout for next iteration if clock is working.
    if (this.isWork) {
      setTimeout(() => {
        this.update.apply(this);
      }, 50);
    }
  }

  
  //  * Start the clock.
   
  // start() {
  //   this.isWork = true;
  //   this.update();
  // }

  //  * Stop the clock.
   
  // stop() {
  //   this.isWork = false;
  // }
}
