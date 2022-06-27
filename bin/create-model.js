const { exec } = require("child_process");

const args = process.argv.slice(2);

if (args.length > 0) {
    let cmd = `sequelize model:create --underscored true --name ${args[0]} --attributes`;

    // apply attributes

    args.slice(1).map(arg => {
        cmd = `${cmd} ${arg}`;
    });

    // exec sequelize model creation command
    exec(cmd, (err, stdout) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stdout);
    });
} else {
    console.log("Please supply model name first and the attributes second");
}
