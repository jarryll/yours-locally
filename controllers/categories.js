module.exports = (db) => {

    let getAllCategories = async (req, res) => {
        console.log("categories controllers triggered")
        const result = await db.categories.getAll()
            res.send(result.rows)
        }  
    
     return {
        getAllCategories
        }
    }