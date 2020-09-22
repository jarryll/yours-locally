module.exports = (dbPoolInstance) => {

    const pullResponses = async (queryValues) => {
        const query = "SELECT enquiries.shop_id AS shop_id, shops.shop_name AS shop_name, enquiries.item_name as listing_name, enquiries.query AS query, responses.response AS reply FROM enquiries INNER JOIN shops ON enquiries.shop_id = shops.id INNER JOIN responses ON responses.enquiry_id = enquiries.id WHERE responses.enquirer_id = $1"
        const result = dbPoolInstance.query(query, queryValues)
        return result
    }

    return {
        pullResponses
    }
}