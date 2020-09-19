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

    const displayEnquiries = async (req, res) => {
        const queryValues = [req.params.id];
        try {
            const result = await db.enquiries.getEnquiries(queryValues)
            res.send(result)
        } catch (err) {
            throw new Error ("failed to get enquiries")
        }
    }

    const deleteEnquiry = async (req, res) => {
        const queryValues = [req.params.id];
        try {
            const result = await db.enquiries.removeEnquiry(queryValues)
            res.send(result)
        } catch (err) {
            throw new Error ("failed to delete enquiry")
        }
        
    }

    
     return {
        sendEnquiry,
        displayEnquiries,
        deleteEnquiry
        }
    }