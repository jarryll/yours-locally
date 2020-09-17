module.exports = (db) => {

    let getShop = async (req, res) => {
        console.log("controllers triggered")
        const value = [req.params.id];
        const result = await db.shops.findShop(value)
            res.send(result.rows)
        }

   let editShop = async (request,response) => {
    let {id} = request.params
    let {shopName,about,imageUrl} = request.body;
    db.shops.getEditShop(shopName,about,imageUrl,id,(err,result)=>{
        if(err){
                console.log(err)
                response.status(500).send("Oops we did not find the shop you were looking for")
            } else {
                response.send("updated!")
            }
    })
   }

   let deleteShop = async (request,response) => {
    let {id} = request.params;
    db.shops.getDeleteShop(id,(err,result)=>{
        if(err){
                console.log(err)
                response.status(500).send("Oops we did not find the shop you were looking for")
            } else {
                response.send("deleted!")
            }
    })
   }


     return {
        getShop,
        editShop,
        deleteShop
        }
    }