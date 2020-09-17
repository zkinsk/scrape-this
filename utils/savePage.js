const fs = require('fs');

module.exports = {
  saveFile: function (file) {
    fs.writeFile('output.html', file, (err, res) => {
      if (err) {
        return console.error(err);
      }
      return console.log(res);
    });
    console.log('saving a file');
  },
};
