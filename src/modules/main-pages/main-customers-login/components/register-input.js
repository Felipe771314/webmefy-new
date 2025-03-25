class RegisterInput extends HTMLElement {
  constructor() {
    super();
    this.tagTitle = this.getAttribute('tag-title') || 'void';
  }

  connectedCallback() {
    this.visibleInput = this.querySelector('[type="text"]');
    this.invisibleInput = this.querySelector('[type="hidden"]');
    this.bindedOnChangeInput = this.onChangeInput.bind(this);
    this.visibleInput.addEventListener('change', this.bindedOnChangeInput);
  }

  disconnectedCallback() {
    this.visibleInput.removeEventListener('change', this.bindedOnChangeInput);
  }

  onChangeInput(event) {
    this.invisibleInput.value = event.target.value
      ? `${this.tagTitle}${this.tagValueSeparator}${event.target.value}`
      : '';
  }

  get tagValueSeparator() {
    return this.getAttribute('tag-value-separator') || ':';
  }
}
window.customElements.define('register-input', RegisterInput);

export default RegisterInput;
