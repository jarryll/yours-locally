module.exports = (dbPoolInstance) => {

    const addEnquiry = async (queryValue) => {
        const query = "INSERT INTO enquiries (item_name, enquirer_id, enquirer_name, email_address, query, shop_id) VALUES ($1, $2, $3, $4, $5, $6);"
        try {

            const result = await dbPoolInstance.query(query, queryValue);
            return result;
        } catch (err) {
            console.log(err)
            throw new Error("Something went wrong with the addEnquiry models function")
        }
    }

    const getEnquiries = async (queryValues) => {
        const query = "SELECT enquiries.id, enquiries.item_name, enquiries.enquirer_id, enquiries.email_address, enquiries.enquirer_name, enquiries.query, shops.shop_name FROM enquiries INNER JOIN shops ON enquiries.shop_id = shops.id INNER JOIN sellers ON sellers.id = shops.seller_id WHERE sellers.id = $1;"
        const result = await dbPoolInstance.query(query, queryValues);
        return result.rows;
    }

    const removeEnquiry = async (queryValues) => {
        const query = "DELETE FROM enquiries where id=$1;"
        const result = await dbPoolInstance.query(query, queryValues);
        return result;
    }

        return {
            addEnquiry,
            getEnquiries,
            removeEnquiry
        }
    }