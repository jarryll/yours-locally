module.exports = (dbPoolInstance) => {

    let findShop = async (value) => {
        console.log(value, "models triggered")
        let query='SELECT * FROM shops WHERE id=$1;'
        const result = await dbPoolInstance.query(query, value)
        return(result)
    }
    
    
        return {
            findShop
        }
    }