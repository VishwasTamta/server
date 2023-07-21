const fs = require("fs");
const path = require("path");

exports.getFolder = (req, res, next) => {
  const pathName = req.body.pathName;
  const page = req.body.page;
  console.log(pathName);
  console.log(page);
  const pathArr = pathName.split(">");
  console.log(pathArr);
  let url = path.join(__dirname, "..", "folders", ...pathArr);

  try {
    switch (pathName) {
      case "/":
        url = path.join(__dirname, "..", "folders");
    }
    fs.readdir(url, (err, files) => {
      if (err) {
        console.log(err);
        res.json({ message: "Not a folder!", status: 400 });
      } else {
        let isEnd = false;
        if (page > 0) {
          if (files.slice(page * 5, page * 5 + 5).length <= 0) {
            isEnd = true;
          }
        }
        res.json({
          message: "Folder content fetched successfully!",
          folders:
            page > 0
              ? files.slice(page * 5, page * 5 + 5)
              : files.slice(page, page + 5),
          isEnd,
        });
      }
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
