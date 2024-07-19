const path = require('path');

// get the current working path
const currentPath = path.dirname(__dirname);
console.log(currentPath);

//get the base name of the file path
const filePath = '/user/local/bin/file.txt';
console.log(path.basename(filePath)); // Output: 'file.txt'
console.log(path.basename(filePath, '.txt')); // Output: 'file'

//get the extension of the file
console.log(path.extname(filePath));

//to get the normalised path by combining all the paths
const directory = '/user/local';
const subdirectory = 'bin';
const fileName = 'file.txt';
console.log(path.join(directory, subdirectory, fileName)); // Output: '/user/local/bin/file.txt'

//to resolve the path into absolute path
console.log(path.resolve('user', 'local', 'bin/file.txt'));
// Output: '/current/working/directory/user/local/bin/file.txt'
console.log(path.resolve('/user', 'local', 'bin/file.txt'));
// Output: '/user/local/bin/file.txt'


//parse the path
const parsedPath = path.parse(filePath);
console.log(parsedPath);
/* Output:
{
  root: '/',
  dir: '/user/local/bin',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/

//format the path
const pathObject = {
    root: '/',
    dir: '/user/local/bin',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
};
console.log(path.format(pathObject)); // Output: '/user/local/bin/file.txt'

