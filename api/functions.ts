import { Response } from "express";

const FetchGet = async (url: string, res: Response) => {
	const data = await fetch(url);
    const dataJSON = await data.json();
    
    if (!data) {
        return res.status(404).json("Something went wrong...");
    }
    
    const content = dataJSON.content;
    const contentDecoded = atob(content);
    const contentDecodedJSON = JSON.parse(contentDecoded);
    
    if (!contentDecoded) {
        return res.status(404).json("Something went wrong...");
    }

    return res.status(200).json(contentDecodedJSON);
}

module.exports = FetchGet;