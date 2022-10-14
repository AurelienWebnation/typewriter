interface Options {
  speed: number;
}

export default class TypeWriter {
  /**
   * The container where the content will be written
   * @type {HTMLElement}
   * @private
   */
  private container: HTMLElement;

  /**
   * An object which contains all the options
   * @type {Options}
   * @private
   */
  private readonly options: Options = {
    speed: 100
  };

  /**
   * @type {object}
   * @private
   */
  private state =  {
    stringIndex: 0,
    contentIndex: 0,
  };

  /**
   * Buffer which contains the strings
   * @type {[string]}
   * @private
   */
  private buffer: Array<string> = [];

  /**
   * @param container {HTMLElement}
   * @param options {object} An Object which contains all the options
   */
  constructor(container: HTMLElement, options: Options) {
    this.container = container;
    this.options = {...this.options, ...options};
    this.write = this.write.bind(this);
  }

  /**
   * Add a string to the buffer
   * @param string {string}
   */
  typeString(string: string) {
    this.buffer.push(string);

    return this;
  }

  /**
   * Add an array of strings to the buffer
   * @param array {[string]}
   */
  addArrayOfStrings(array: Array<string>) {
    this.buffer.push(...array);

    return this;
  }

  /**
   * Start the writing into the container. Return a promise when the writing is done.
   * @returns {Promise}
   */
  write(): Promise<void> {
    return new Promise<void>((resolve) => {
      const run = () => {
        const { stringIndex, contentIndex } = this.state;

        if (contentIndex > this.buffer.length - 1) return resolve();

        if (stringIndex < this.buffer[contentIndex].length) {
          this.container.innerHTML += this.buffer[contentIndex].charAt(stringIndex);
          this.state.stringIndex++;
        } else {
          this.container.innerHTML += '<br>';
          this.state.stringIndex = 0;
          this.state.contentIndex++;
        }
        setTimeout(run, this.options.speed);
      }
      run();
    });
  }
}