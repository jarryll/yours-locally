module.exports = (db) => {

    let getShop = async (req, res) => {
        console.log("controllers triggered")
        const value = [req.params.id];
        const result = await db.shops.findShop(value)
            res.send(result.rows)
        }  
    
     return {
        getShop
        }
    }