module.exports = (dbPoolInstance) => {

    let findShop = async (value) => {
        console.log(value, "models triggered")
        let query='SELECT * FROM shops WHERE id=$1;'
        const result = await dbPoolInstance.query(query, value)
        return(result)
    }

    let getEditShop = async (shopName,about,imageUrl,id,callback)=> {
        about = about.replace(/[\"\'\`]/g, "");
        let values=[shopName,about,imageUrl,id]
        let query = `UPDATE shops SET shop_name=$1, image_url=$3, about=$2 WHERE id=$4`
        dbPoolInstance.query(query,values,(err,result)=>{
            callback(err,result)
            })
    }
        return {
            findShop,
            getEditShop
        }
    }