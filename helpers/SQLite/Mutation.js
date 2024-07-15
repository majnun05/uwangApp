import Database from "../Database";
const db = new Database();

export const viewMutation = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from history_mutation where date(waktu) between ? and ? and reseller_id = ? order by waktu desc",
            [data.dateStart, data.dateEnd, data.id]
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

export const addMutation = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `history_mutation` (`reseller_id`, `waktu`, `keterangan`, `saldo`, `totalsaldo`) VALUES (?, ?, ?, ?, ?);",
              [
                data[i].reseller_id,
                data[i].waktu,
                data[i].keterangan,
                data[i].saldo,
                data[i].totalsaldo,
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
