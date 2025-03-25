class FormBirthDate extends HTMLElement {
  connectedCallback() {
    this.iso_code = this.querySelector('#form-birthdate');
    this.userbirthdate = this.querySelector('#birthday');

    this.dayofbirth = this.querySelector('#day_of_birth');
    this.monthofbirth = this.querySelector('#month_of_birth');
    this.yearofbirth = this.querySelector('#year_of_birth');
    this.dateofbirth = this.querySelector('#date_of_birth');

    this.birthselectstyleisinputordropdown =
      this.dayofbirth !== null && this.monthofbirth !== null && this.yearofbirth !== null;
    this.birthselectstyleiscalendar = this.dateofbirth !== null;

    this.handleChange = this.handleChange.bind(this);

    if (this.birthselectstyleisinputordropdown) {
      this.dayofbirth.addEventListener('change', this.handleChange);
      this.monthofbirth.addEventListener('change', this.handleChange);
      this.yearofbirth.addEventListener('change', this.handleChange);
    }
    if (this.birthselectstyleiscalendar) {
      this.dateofbirth.addEventListener('change', this.handleChange);
    }
  }

  disconnectedCallback() {
    if (this.birthselectstyleisinputordropdown) {
      this.dayofbirth.removeEventListener('change', this.handleChange);
      this.monthofbirth.removeEventListener('change', this.handleChange);
      this.yearofbirth.removeEventListener('change', this.handleChange);
    }
    if (this.birthselectstyleiscalendar) {
      this.dateofbirth.removeEventListener('change', this.handleChange);
    }
  }

  get inputName() {
    return this.getAttribute('input-name') || 'customer[tags][Birthday]';
  }

  get tagValueSeparator() {
    return this.getAttribute('tag-value-separator') || ':';
  }

  get useUniformizedTagValueFormat() {
    return this.hasAttribute('use-uniformized-tag-value-format');
  }

  handleChange() {
    if (this.birthselectstyleisinputordropdown || this.birthselectstyleiscalendar) {
      this.userbirthdate.name = this.inputName;

      if (this.useUniformizedTagValueFormat) {
        if (this.birthselectstyleisinputordropdown) {
          this.userbirthdate.value = `birthday${this.tagValueSeparator}${this.yearofbirth.value}-${this.monthofbirth.value}-${this.dayofbirth.value}`;
        }
        if (this.birthselectstyleiscalendar) {
          this.userbirthdate.value = `birthday${this.tagValueSeparator}${this.dateofbirth.value}`;
        }
      } else {
        if (this.birthselectstyleisinputordropdown) {
          this.userbirthdate.value = `date-de-naissance${this.tagValueSeparator}${this.dayofbirth.value}/${this.monthofbirth.value}/${this.yearofbirth.value}`;
        }
        if (this.birthselectstyleiscalendar) {
          const dateofbirthconvertedformat = this.dateofbirth.value.split('-').reverse().join('/');
          this.userbirthdate.value = `date-de-naissance${this.tagValueSeparator}${dateofbirthconvertedformat}`;
        }
      }
    } else {
      this.userbirthdate.name = '';
      this.userbirthdate.value = '';
    }
  }
}
window.customElements.define('form-birthdate', FormBirthDate);

export default FormBirthDate;
