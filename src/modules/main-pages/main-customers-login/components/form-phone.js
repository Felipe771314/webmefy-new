import { countriesCode } from './countries-code';

class FormPhone extends HTMLElement {
  connectedCallback() {
    this.selectCountry = this.querySelector('#countryList');
    this.invisibleInput = this.querySelector('[type="hidden"]');
    this.phonePrefix = this.querySelector('#phone-prefix');
    this.userPhone = this.querySelector('#user-phone');
    this.userLang = this.getAttribute('user-lang');

    this.bindedOnSelectInput = this.onChangeSelect.bind(this);
    this.selectCountry.addEventListener('change', this.bindedOnSelectInput);
    this.bindedOnPrefixChange = this.onPrefixChange.bind(this);
    this.phonePrefix.addEventListener('change', this.bindedOnPrefixChange);
    this.bindedOnChangeInput = this.onChangeInput.bind(this);
    this.userPhone.addEventListener('change', this.bindedOnChangeInput);

    this.countryData = '';
    this.init();
  }

  disconnectedCallback() {
    this.selectCountry.removeEventListener('change', this.bindedOnSelectInput);
    this.phonePrefix.removeEventListener('change', this.bindedOnChangeInput);
    this.userPhone.removeEventListener('change', this.bindedOnChangeInput);
  }

  getUserLang(userLang) {
    this.langToPrefix = countriesCode.find(({ lang }) => lang === userLang);
    if (this.langToPrefix) {
      this.langToPrefix.value = this.langToPrefix.prefix;
    } else {
      this.langToPrefix.value = '';
    }
  }

  init() {
    this.getUserLang(this.userLang);
    this.phonePrefix.value = this.langToPrefix.value;
  }

  getCodeForCountry(userCountry) {
    this.countryData = countriesCode.find(({ country }) => country === userCountry);
    if (this.countryData) {
      this.countryData = this.countryData.prefix;
      this.invisibleInput.value = `phone:(${this.countryData})${this.userPhone.value}`;
    } else {
      this.countryData = '';
    }
  }

  getCountryFromPrefix(userPrefix) {
    this.userTypedPrefix = countriesCode.find(({ prefix }) => prefix === userPrefix.target.value);
    if (this.userTypedPrefix) {
      this.selectCountry.value = this.userTypedPrefix.country;
      this.phonePrefix.value = this.userTypedPrefix.prefix;
    } else if (!this.userTypedPrefix) {
      this.selectCountry.value = '---';
    }
  }

  onPrefixChange(e) {
    e.preventDefault();
    this.getCountryFromPrefix(e);
    this.invisibleInput.value = `phone:(${this.phonePrefix.value})${this.userPhone.value}`;
  }

  onChangeSelect(e) {
    this.getCodeForCountry(this.selectCountry.value);
    if (this.countryData !== '') {
      this.phonePrefix.value = this.countryData;
    } else {
      this.phonePrefix.value = '';
    }
  }

  onChangeInput(e) {
    e.preventDefault();
    this.invisibleInput.value = `phone:(${this.phonePrefix.value})${e.target.value}`;
  }
}

window.customElements.define('form-phone', FormPhone);

export default FormPhone;
