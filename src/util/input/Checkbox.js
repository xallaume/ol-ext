import ol_ext_inherits from '../ext'
import ol_ext_input_Base from './Base'

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}
 * @fires check
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element|string} [options.html] label content
 *  @param {string} [options.after] label garnish (placed after)
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {boolean} [options.autoClose=true]
 *  @param {boolean} [options.visible=false] display the input
 */
var ol_ext_input_Checkbox = function(options) {
  options = options || {};

  ol_ext_input_Base.call(this, options);

  var label = this.element = document.createElement('LABEL');
  if (options.html instanceof Element) label.appendChild(options.html)
  else if (options.html !== undefined) label.innerHTML = options.html;
  label.className = ('ol-ext-check ol-ext-checkbox'  + (options.className || '')).trim();

  if (this.input.parentNode) this.input.parentNode.insertBefore(label, this.input);
  label.appendChild(this.input);
  label.appendChild(document.createElement('SPAN'));
  if (options.after) {
    label.appendChild(document.createTextNode(options.after));
  }

  // Handle change
  this.input.addEventListener('change', function() {
    this.dispatchEvent({ type: 'check', checked: this.input.checked, value: this.input.value });
  }.bind(this));

};
ol_ext_inherits(ol_ext_input_Checkbox, ol_ext_input_Base);
  
ol_ext_input_Checkbox.prototype.isChecked = function () {
  return this.input.checked;
};

export default ol_ext_input_Checkbox
