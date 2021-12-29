import { Component, h } from '@stencil/core';

@Component({
  tag: 'demo-component',
  styleUrl: 'demo-component.css',
})
export class DemoComponent {
  render() {
    return (
      <div class="wrapper">
        <p>This is a demo component</p>
      </div>
    );
  }
}
