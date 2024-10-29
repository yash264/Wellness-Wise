const axios =require("axios")
const recommendations=async (req,res)=>{
    try {
        const response = await axios.post("http://127.0.0.1:5001/api/recommendations", req.body);
        res.json(response.data);
        console.log(response);

    } catch (error) {
        res.status(500).send("Error fetching recommendations" + error);
    }
}

module.exports={recommendations}