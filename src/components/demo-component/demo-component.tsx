import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';

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

  @Listen('change', { capture: true })
  onChangeHandler(e: object) {
    console.log('🚀 ~ file: demo-component.tsx ~ line 23 ~ DemoComponent ~ onChangeHandler ~ e', e);
    let newValue = e?.['path']?.[0]?.['value'];
    console.log('🚀 ~ file: demo-component.tsx ~ line 25 ~ DemoComponent ~ onChangeHandler ~ newValue', newValue);

    if (this.inputType.match('text')) {
      if (newValue?.['length'] >= this.min && newValue?.['length'] <= this.max) {
        this.inputValue = newValue;
      }
    } else {
      newValue = parseInt(newValue);
      if (newValue >= this.min && newValue <= this.max) {
        this.inputValue = newValue;
      }
    }
    console.log(newValue, typeof newValue);
  }
  @Listen('keyup', { capture: true })
  onKeyupHandler(e: object) {
    console.log('🚀 ~ file: demo-component.tsx ~ line 23 ~ DemoComponent ~ onChangeHandler ~ e', e);
    let newValue = e?.['path']?.[0]?.['value'];
    if (this.inputType.match('text')) {
      if (newValue?.['length'] >= this.min && newValue?.['length'] <= this.max) {
        this.inputValue = newValue;
      } else return;
    } else {
      newValue = parseInt(newValue);
      if (newValue >= this.min && newValue <= this.max) {
        this.inputValue = newValue;
      } else return;
    }
    console.log(newValue, typeof newValue);
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

  connectedCallback() {
    if (this.inputType.match('number')) {
      console.log('from number type setting inputValue from defaultValue...');
      this.inputValue = this.defaultValue;
    }
  }

  // onChangeHandler = (e: object) => {
  //   console.log('from onChangeHandler...');
  //   let inputValue = e?.['path'][0]['value'];
  //   if (this.inputType.match('number')) {
  //     inputValue = parseInt(inputValue);
  //   }

  //   this.inputValue = inputValue;
  // };

  getInputField = () => {
    let inputField = null;

    if (this.inputType.match('text')) {
      inputField = (
        <input type="text" placeholder={this.placeholderValue} maxLength={this.max} minLength={this.min} value={this.inputValue} onChange={e => this.onChangeHandler(e)} />
      );
    } else if (this.inputType.match('number')) {
      inputField = (
        <input
          type="number"
          placeholder={this.placeholderValue}
          max={this.max}
          min={this.min}
          value={this.inputValue ? this.inputValue : this.defaultValue}
          onChange={e => this.onChangeHandler(e)}
        />
      );
    }
    return inputField;
  };

  render() {
    return <div class="wrapper">{this.getInputField()}</div>;
  }
}
