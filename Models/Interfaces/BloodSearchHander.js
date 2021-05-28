//module export
module.exports = (user, db) => {
    //variables
    const blood = user.Search;

    const sqlSelect = "SELECT * FROM blood_stocks WHERE blood_group = ?";

    //
    db.query(sqlSelect, [blood], (err, result) => {
        if (err) {
            console.log("**   SEARCH ERROR   **" + err);
        }

        if (result.length > 0) {
            console.log(result);
            console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
        } else {
            console.log({ message: "NO SEARCH RESULTS FOUND!" });
        }
    });
};
