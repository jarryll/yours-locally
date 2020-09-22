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

    return {
        getResponses
    }
}