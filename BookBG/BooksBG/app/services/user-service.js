fs.readdirSync(__dirname)
    .filter((file) => file.includes('.router'))
    .forEach((file) => {
        const modulePath = path.join(__dirname, file);
        require(modulePath).attachTo(app, data);
    });