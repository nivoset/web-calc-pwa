import { html, LitElement } from 'lit-element';
import { base } from './variables';

const OPERATIONS = new Map();
OPERATIONS.set("+", (a,b) => a+b);
OPERATIONS.set("-", (a,b) => a-b);
OPERATIONS.set("X", (a,b) => a*b);
OPERATIONS.set("÷", (a,b) => a/b);

export class Calculator extends LitElement {

  constructor() {
    super()
    this.current = '0';
    this.previous = null;
    this.operator = null;
    this.clearOnType = true;

    this.addEventListener('keypress', this.handleKeyboard);
  }
  static get props () {
    return {
      theme: {
        type: String,
      },
      current: {
        type: String,
      }
    }
  }
  static get styles() {
    return [base]
  }
  sign() {
    if (this.current.indexOf('-') === -1) {
      this.current = `-${this.current}`;
    } else {
      this.current = this.current.slice(1);
    }
    this.fireUpdate("sign change");
  }
  clear() {
    this.current = '0';
    this.previous = null;
    this.operator = null;
    this.clearOnType = true;
    this.fireUpdate("clear");
  }
  addDigit(digit) {
    return (e) => {
      if (e) e.preventDefault();
      if (this.clearOnType) {
        this.current = '';
        this.clearOnType = false;
      }
      this.current = `${this.current}${digit}`;
      this.fireUpdate(digit);
    }
  }
  addDot() {
    if (this.current.indexOf('.') === -1) {
      if (this.current === '0') {
        this.current = '0.';
        this.clearOnType = false;
        this.fireUpdate(".");
      } else { 
        this.addDigit('.')();
      }
    }
  }
  setOperator(operation) {
    return () => {
      if (this.operator) this.equals();
      this.operator = operation;
      this.previous = this.current;
      this.current = "";
      this.clearOnType = true;
      this.fireUpdate(operation);
    }
  }
  percent() { 
    this.current = `${parseFloat(this.current)/100}`;
    this.fireUpdate("%");
  }
  equals() {
    if (this.preventEquals()) return;
    this.current = `${OPERATIONS
        .get(this.operator)(
          parseFloat(this.previous),
          parseFloat(this.current)
    )}`;
    this.previous = null;
    this.clearOnType = true;
    this.fireUpdate("=");
  }
  preventEquals() {
    return this.previous === null || !OPERATIONS.has(this.operator);
  }
  fireUpdate(change) {
    let event = new CustomEvent('update', {
      detail: {
        change,
        value: `${this.previous ? `${this.previous}${this.operator}` : ''}${this.current}`,
      }
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }
  handleKeyboard(e) {
    e.preventDefault();
    if (!isNaN(e.key)) {
      this.addDigit(e.key)();
    } else {
      switch (e.key) {
        case '%': 
          this.percent();
          break;
        case '/': 
          this.setOperator("÷")(); 
          break;
        case '-':
        case 'x':
        case '*':
        case '+': 
          this.setOperator(e.key); 
          break;
        case 'Enter':
        case '=': 
          this.equals();
          break;
        default: 
          console.warn('unable to use keypress', e);
          break;
      }
    }
  }
  backspace() {
    this.current = this.current.slice(0,-1)
    if (!this.current.length) {
      this.current = '0';
      this.clearOnType = true;
    }
    this.fireUpdate();
  }
  
  render() {
    return html`
    <div class="calculator">
      <div class="display">${this.previous ? `${this.previous}${this.operator}` : ''}${this.current}</div>
      <button id="clear"    @click="${this.clear}"       >C</button>
      <button id="sign"     @click="${this.sign}"        >+/-</button>
      <button id="percent"  @click="${this.percent}"     >%</button>
      <button id="digit-0"  @click="${this.addDigit(0)}" class="btn zero">0</button>
      <button id="digit-1"  @click="${this.addDigit(1)}" >1</button>
      <button id="digit-2"  @click="${this.addDigit(2)}" >2</button>
      <button id="digit-3"  @click="${this.addDigit(3)}" >3</button>
      <button id="digit-4"  @click="${this.addDigit(4)}" >4</button>
      <button id="digit-5"  @click="${this.addDigit(5)}" >5</button>
      <button id="digit-6"  @click="${this.addDigit(6)}" >6</button>
      <button id="digit-7"  @click="${this.addDigit(7)}" >7</button>
      <button id="digit-8"  @click="${this.addDigit(8)}" >8</button>
      <button id="digit-9"  @click="${this.addDigit(9)}" >9</button>
      <button id="dot"      @click="${this.addDot}" >.</button>
      <button id="plus"     @click="${this.setOperator('+')}" class="operator">+</button>
      <button id="minus"    @click="${this.setOperator('-')}" class="operator">-</button>
      <button id="multiply" @click="${this.setOperator('X')}" class="operator">x</button>
      <button id="divide"   @click="${this.setOperator('÷')}" class="operator">÷</button>
      <button id="equal"    @click="${this.equals}" class="operator">=</button>

      <!-- TODO -->
      <button id="backspace" @click="${this.backspace}" class="operator">←</button>
    </div>
    `;
  }
}


customElements.define('web-calculator', Calculator);
