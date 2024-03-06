class Manager {
  _baseAlert: any = null;

  register(_ref: any) {
      if (!this._baseAlert ) {
          this._baseAlert = _ref;
      }
  }

  unregister(_ref: any) {
      if (this._baseAlert && this._baseAlert._id === _ref._id) {
          this._baseAlert = null;
      }
  }

  getDefault() {
      return this._baseAlert;
  }
}

export default new Manager();
