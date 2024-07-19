const fs = require('fs')
const path = require('path')

//create a new directory using fs.mkdir() at same level
//use path.dirname(__dirname) or path.dirname(path.dirname(__dirname)) to go levels up 
fs.mkdir('newDir', { recursive: true }, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Directory has been created');
});

//creating a new directory one level up
const currentPath = path.dirname(__dirname);
const newPath = path.join(currentPath, 'newDirectory');
fs.mkdir(newPath, { recursive: true }, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Directory has been created');
})

//appending a file and create if not already existing
fs.appendFile("test.txt", "This is a simple test file", (err) => {
    if (err) {
        return;
    }
    console.log('file has been created');
})
const filepath = path.join(newPath, "test.txt");
fs.writeFile(filepath, "this is a simple test file", (err) => {
    if (err) {
        return;
    }
    console.log('file has been created and written');
})

// read the test file the default encoding is null which return buffer obj.
fs.readFile(filepath, 'utf-8', (err, data) => {
    if (!err) {
        console.log(data, "file contents are read")
    }
}
)

//rename the file 
fs.rename('test.txt', 'newName.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been renamed');
});

//check if the file exists
if (fs.existsSync('example.txt')) {
    console.log('File exists');
} else {
    console.log('File does not exist');
}

//remove the directory
fs.rmdir('newDir', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Directory has been removed');
});

