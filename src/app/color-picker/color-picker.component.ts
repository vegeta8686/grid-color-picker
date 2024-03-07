import { Component, ElementRef, Input, OnInit, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {

  /**
   *
   * storing the default colors
   * @type {*}
   * @memberof ColorPickerComponent
   */
  @Input() colors: any = [];
  /**
   *
   * contains the selected color
   * @type {string}
   * @memberof ColorPickerComponent
   */
  selectedColor!: string;
  /**
   *
   * sets property disabled
   * @type {boolean}
   * @memberof ColorPickerComponent
   */
  isDisabled!: boolean;
  /**
   *
   * on change function to update control value
   * @private
   * @memberof ColorPickerComponent
   */
  private onChange: (color: string) => void = () => {};
  /**
   *
   * on touch function to update state of control
   * @private
   * @memberof ColorPickerComponent
   */
  private onTouch: () => void = () => {};

  /**
   * Creates an instance of ColorPickerComponent.
   * @param {Renderer2} renderer
   * @param {ElementRef} el
   * @memberof ColorPickerComponent
   */
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  /**
   *
   * initialize the component
   * @memberof ColorPickerComponent
   */
  ngOnInit(): void {
    if(this.colors.length > 0) {
      this.selectedColor = this.colors[0];
      this.onChange(this.selectedColor);
    }
  }
  /**
   *
   * sets the value to controller
   * @param {string} color
   * @memberof ColorPickerComponent
   */
  writeValue(color: string) {
    this.selectedColor = color;
  }
  /**
   *
   * register on change of control value
   * @param {(color: string) => void} fn
   * @memberof ColorPickerComponent
   */
  registerOnChange(fn: (color: string) => void) {
    this.onChange = fn;
  }
  /**
   *
   * register on touch of control
   * @param {() => void} fn
   * @memberof ColorPickerComponent
   */
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  /**
   *
   * sets the disabled state
   * @param {boolean} isDisabled
   * @memberof ColorPickerComponent
   */
  setDisabledState?(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    this.renderer.setProperty(
      this.el.nativeElement,
      'disabled',
      this.isDisabled
    );
  }
  /**
   *
   * handle the arrow keys
   * @param {KeyboardEvent} event
   * @memberof ColorPickerComponent
   */
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isDisabled) {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          this.handleArrowKey(event.key);
          break;
      }
    }
  }

  /**
   *
   * set the position based on key press
   * @param {string} key
   * @memberof ColorPickerComponent
   */
  handleArrowKey(key: string) {
    const currentIndex = this.colors.indexOf(this.selectedColor);
    let newIndex: any;

    switch (key) {
      case 'ArrowUp':
        newIndex = currentIndex - 5;
        break;
      case 'ArrowDown':
        newIndex = currentIndex + 5;
        break;
      case 'ArrowLeft':
        newIndex = currentIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex + 1;
        break;
    }

    newIndex = this.clamp(newIndex, 0, this.colors.length - 1);
    this.selectedColor = this.colors[newIndex];
    this.onChange(this.selectedColor);
    this.onTouch();
  }

  /**
   *
   * clamp the value and gives the index
   * @private
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @return {*}  {number}
   * @memberof ColorPickerComponent
   */
  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
  /**
   *
   * sets the color on selection
   * @param {string} color
   * @memberof ColorPickerComponent
   */
  selectColor(color: string) {
    this.selectedColor = color;
    this.onChange(color);
    this.onTouch();
  }

}
