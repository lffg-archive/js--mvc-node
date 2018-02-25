module.exports = {
  /**
   * Clears special characters from a string.
   * 
   * @param   {string} content
   * @return  {string}
   */
  xss: content => {
    content = content || '';
    
    content = String(content);

    return content
      .replace(/'/g, '&#039;')
      .replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    ;
  }
};