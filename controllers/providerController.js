const logger = require("../config/loggerApi.js");
const jwtDecodeService = require("../services/jwtDecodeService");
const providerService = require("../services/providerService");


const providerOnboarding = async (req, res) => {
    try {
        logger.info("Enter in providerController - providerOnboarding");
        // let token = req.headers["authorization"];
        // if (token && token.startsWith("Bearer ")) {
        //     token = token.slice(7); // removes "Bearer " (including the space)
        // }
        let decodeValue={
            username:"admin"
        };
        const result = await providerService.providerOnboarding(req,decodeValue,res);
        if (result) {
            return res.status(200).json({
                message: "provider onboarding successful",
                extractedText: result,
            });
        } else {
            return res.status(400).json({
                message: "File not processed successfully",
            });
        }
    } catch (error) {
        console.error("Error extracting text:", error);
        res.status(500).json({ message: "Failed to extract text from file" });
    }
};

module.exports = {
    providerOnboarding
};