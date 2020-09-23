module.exports = (db) => {

    const getResponses = async (req, res) => {
        const queryValues = [req.params.id]
        try {
            const result = await db.responses.pullResponses(queryValues)
            res.send(result.rows)
        } catch (err) {
            throw new Error(err.stack, 'something went wrong with retrieving responses')
        }

    }


    const replyEnquiry = (request,response) => {
    let { reply,respondentId,enquiryId,enquirerId } = request.body;
    let values = [reply,respondentId,enquiryId,enquirerId];
    db.responses.getReplyEnquiry(values,(err,result)=>{
            if (err) {
                console.log('error at response controller, replyEnquiry ---', err.message);
            }
            else {
                response.send("Response Created!");
            }
    })
   }


   const userReplyEnquiry = (request,response) => {
    let {itemName,enquirerId,enquirerName,emailAdd, queryz, shopId} = request.body;
    let values = [itemName,enquirerId,enquirerName,emailAdd, queryz, shopId]

    db.responses.getUserReplyEnquiry(values,(err,result)=>{
            if (err) {
                console.log('error at response controller, userReplyEnquiry ---', err.message);
            }
            else {
                response.send("Response Created!");
            }
    })
}


    const sellerPullResponses = async (req, res) => {
        const queryValues = [req.params.id]
        try {
            const result = await db.responses.getSellerPullResponses(queryValues)
            res.send(result.rows)
        } catch (err) {
            throw new Error(err.stack, 'something went wrong with retrieving responses')
        }
    }


    return {
        getResponses,
        replyEnquiry,
        userReplyEnquiry,
        sellerPullResponses
    }
}