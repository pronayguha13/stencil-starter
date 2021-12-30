import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'demo-component',
  styleUrl: 'demo-component.css',
})
export class DemoComponent {
  @State() inputValue: string | number;

  @Prop({ mutable: true }) defaultValue: number = 0;
  @Prop({ mutable: true }) placeholderValue: string;
  @Prop({ mutable: true }) min: number = 0;
  @Prop({ mutable: true }) max: number = 100;
  @Prop({ mutable: true }) inputType: string = 'text';

  @Watch('placeholderValue')
  validatePlaceholderValue(newValue: string) {
    if (!newValue || typeof newValue === 'undefined' || !newValue.length) this.placeholderValue = 'Hello';
  }

  @Watch('inputType')
  resetInputValue(newValue: string) {
    if (newValue.match('text')) {
      if (typeof this.inputValue !== 'string') {
        this.inputValue = this.defaultValue;
      }
    } else if (newValue.match('number')) {
      if (typeof this.inputValue !== 'number') this.inputValue = '';
    }
  }

  @Watch('inputValue')
  validateInput(newValue: string | number, oldValue: string | number) {
    console.log('validating input ....');
    if (this.inputType.match('text')) {
      if (newValue?.['length'] < this.min || newValue?.['length'] > this.max) {
        this.inputValue = oldValue;
      }
    } else {
      if (newValue < this.min || newValue > this.max) {
        this.inputValue = oldValue;
      }
    }
    console.log(newValue, typeof newValue);
  }

  connectedCallback() {
    if (this.inputType.match('number')) {
      console.log('setting inputValue from defaultValue...');
      this.inputValue = this.defaultValue;
    }
  }

  onChangeHandler = (e: object) => {
    console.log('from onChangeHandler...');
    let inputValue = e?.['path'][0]['value'];
    if (this.inputType.match('number')) {
      inputValue = parseInt(inputValue);
    }

    this.inputValue = inputValue;
  };

  onKeyDownHandler = (e: object) => {
    console.log('🚀 ~ file: demo-component.tsx ~ line 56 ~ DemoComponent ~ e', e);
    if (this.inputType.match('number')) {
      if ((e?.['keyCode'] >= 48 && e?.['keyCode'] <= 57) || (e?.['keyCode'] >= 96 && e?.['keyCode'] <= 105)) {
        let inputValue = e?.['path'][0]['value'];
        console.log('🚀 ~ file: demo-component.tsx ~ line 61 ~ DemoComponent ~ inputValue', inputValue);
        inputValue = parseInt(inputValue);
        this.inputValue = inputValue;
      }
    }
  };

  getInputField = () => {
    let inputField = null;

    if (this.inputType.match('text')) {
      inputField = <input type="text" placeholder={this.placeholderValue} maxLength={this.max} minLength={this.min} value={this.inputValue} />;
    } else if (this.inputType.match('number')) {
      inputField = (
        <input
          type="number"
          placeholder={this.placeholderValue}
          max={this.max}
          min={this.min}
          value={this.inputValue ? this.inputValue : this.defaultValue}
          onChange={e => this.onChangeHandler(e)}
          onKeyPress={e => this.onKeyDownHandler(e)}
        />
      );
    }
    return inputField;
  };

  render() {
    return <div class="wrapper">{this.getInputField()}</div>;
  }
}
