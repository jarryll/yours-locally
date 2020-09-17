module.exports = (dbPoolInstance) => {

    let getAll = async () => {
        console.log(" categories models triggered")
        let query='SELECT * FROM categories;'
        try{
            const result = await dbPoolInstance.query(query)
            return(result)
        } catch (err) {
            console.log(err.stack)
            throw new Error ("Failed to fetch all categories")
        }  
    }
    
    
        return {
            getAll
        }
    }