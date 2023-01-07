const Userdb = require("../model/model");
const excelJS = require("exceljs");

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        bankname: req.body.bankname,
        branch: req.body.branch,
        acctype:req.body.acctype,
        username: req.body.username,
        password: req.body.password,
        passwdupddate: req.body.passwdupddate,
        transpasswd: req.body.transpasswd,
        cardno: req.body.cardno,
        bankpin: req.body.bankpin
    });

    // save user in the database
    user.save(user)
        .then((data) => {
            //res.send(data)
            res.redirect("/add-user");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating a create operation",
            });
        });
};

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: "Not found user with id " + id,
                    });
                } else {
                    res.send(data);
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Erro retrieving user with id " + id,
                });
            });
    } else {
        Userdb.find()
            .then((user) => {
                res.send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Error Occurred while retriving user information",
                });
            });
    }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update user with ${id}. Maybe user not found!`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Error Update user information" });
        });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Delete with id ${id}. Maybe id is wrong`,
                });
            } else {
                res.send({
                    message: "User was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });

};


exports.exportExcel=  (async (req,res) => {

    
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "name", key: "name", width: 10 }, 
      { header: "bankname ", key: "fname", width: 10 },
      { header: "branch", key: "lname", width: 10 },
      { header: "name", key: "name", width: 10  },
      { header: "name", key: "name", width: 10  },
  ];
  // Looping through User data
  let counter = 1;
  Userdb.forEach((data) => {
    user.s_no = counter;
    worksheet.addRow(data); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
     .then(() => {
       res.send({
         status: "success",
         message: "file successfully downloaded",
         path: `${path}/users.xlsx`,
        });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
  

});
