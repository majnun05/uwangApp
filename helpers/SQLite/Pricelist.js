import Database from "../Database";
const db = new Database();

export const viewPricelist = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from inbox where date(date) between ? and ? order by id_message desc",
            [data.dateStart, data.dateEnd]
            //and reseller_id = ?
            //, data.idreseller
          ).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then((result) => {
            // this.closeDatabase(db);
          })
          .catch((err) => {
            //log
          });
      })
      .catch((err) => {
        //log
      });
  });
};

export const addPricelist = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `inbox` (`id_message`, `reseller_id`, `image`, `title`, `message`, `date`) VALUES (?, ?, '', '', ?, ?);",
              [
                data[i].id_message,
                data[i].idreseller,
                data[i].message,
                data[i].date,
              ]
            ).then(([tx, results]) => {
              resolve(results);
            });
          }
        })
          .then((result) => {
            // this.closeDatabase(db);
          })
          .catch((err) => {
            //log
          });
      })
      .catch((err) => {
        //log
      });
  });
};
