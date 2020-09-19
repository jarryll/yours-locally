module.exports = (db) => {

    const sendEnquiry = async (req, res) => {
        const { selectedItem, enquirer, userEmail, enquiry, shopId } = req.body
        const queryValues = [selectedItem, enquirer, userEmail, enquiry, shopId];
        try {
            const result = await db.enquiries.addEnquiry(queryValues)
            res.send("success")
        } catch (err) {
            throw new Error ("failed to send enquiry")
        }
      
    }  
    
     return {
        sendEnquiry
        }
    }