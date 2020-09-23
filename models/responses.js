module.exports = (dbPoolInstance) => {

    const pullResponses = async (queryValues) => {
        const query = "SELECT enquiries.shop_id AS shop_id, shops.shop_name AS shop_name, enquiries.item_name as listing_name, enquiries.query AS query, responses.response AS reply,enquiries.email_address,responses.enquirer_id,enquiries.enquirer_name,responses.id as responseId FROM enquiries INNER JOIN shops ON enquiries.shop_id = shops.id INNER JOIN responses ON responses.enquiry_id = enquiries.id WHERE responses.enquirer_id = $1"
        const result = dbPoolInstance.query(query, queryValues)
        return result
    }

    const getReplyEnquiry = (values,callback) => {
        let query= `INSERT INTO responses (enquirer_id, respondent_id,enquiry_id,response) VALUES($4,$2,$3,$1)`

        dbPoolInstance.query(query, values,(err, result) => {
            if (err) {
                console.log('error at listings models, getReplyEnquiry ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    const getUserReplyEnquiry = (values,callback) => {
        let query=`INSERT INTO enquiries (item_name,enquirer_id,enquirer_name, email_address, query, shop_id) VALUES($1,$2,$3,$4,$5,$6)`
        dbPoolInstance.query(query, values,(err, result) => {
            if (err) {
                console.log(err)
                console.log('error at listings models, getUserReplyEnquiry ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }


    const getSellerPullResponses = async (queryValues) => {
        const query = "SELECT enquiries.shop_id AS shop_id, shops.shop_name AS shop_name, enquiries.item_name as listing_name, enquiries.query AS query, responses.response AS reply,enquiries.email_address,responses.enquirer_id,enquiries.enquirer_name FROM enquiries INNER JOIN shops ON enquiries.shop_id = shops.id INNER JOIN responses ON responses.enquiry_id = enquiries.id WHERE responses.respondent_id = $1"
        const result = dbPoolInstance.query(query, queryValues)
        return result
    }



    return {
        pullResponses,
        getReplyEnquiry,
        getUserReplyEnquiry,
        getSellerPullResponses
    }
}