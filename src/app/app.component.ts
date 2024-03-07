import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   *
   * title of the page
   * @memberof AppComponent
   */
  title = 'Grid Color Picker';
  /**
   *
   * store the formcontrols
   * @type {FormGroup}
   * @memberof AppComponent
   */
  form: FormGroup = new FormGroup({});
  /**
   *
   * default colors passing to child component
   * @memberof AppComponent
   */
  colors = ['#ff0000', '#00ff0', '#0000ff', '#ffff00', '#ff00ff', '#395f8f', 'rgb(0, 100, 100)'];

  /**
   * Creates an instance of AppComponent.
   * @param {FormBuilder} fb
   * @memberof AppComponent
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedColor : ['ff0000']
    });
  }
}
