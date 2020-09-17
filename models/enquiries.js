module.exports = (dbPoolInstance) => {

    const addEnquiry = async (queryValue) => {
        const query = "INSERT INTO enquiries (item_name, email_address, query, shop_id) VALUES ($1, $2, $3, $4);"
        try {
            const result = await dbPoolInstance.query(query, queryValue);
            return result;
        } catch (err) {
            throw new Error("Something went wrong with the addEnquiry models function")
        }
    }
    
    
        return {
            addEnquiry
        }
    }