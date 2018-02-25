module.exports = class Form {
  getHTML(firstName, lastName) {
    return `
      <div>
        First name: <strong>${xss(firstName)}</strong>
        <br />
        <br />
        Last name: <strong>${xss(lastName)}</strong>
      </div>
    `;
  }
};