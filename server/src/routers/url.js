import express from "express";
import gPP from "../utils/getProjectProperty.js";
import db from "../utils/db.js"
import crawl from "../utils/crawl.js"
import cf from '../utils/config.js'

const router  = express.Router();

router.post('/', async (req, res) => {

    try{
        const url = req.body.url;
        let urlObject = await db.findObject({url: req.body.url}, 'url');
        if(urlObject != null){
            const now = new Date();
            const lastUpdate = new Date(urlObject.updatedAt);
            if(now - lastUpdate < 24*60*60*1000){
                res.status(302).redirect(`/url/${urlObject._id}`)
            }else{
                const returnData = await crawl.getAllData(url);
                await db.updateObject(
                    {url: url},
                    {...returnData},
                    'set',
                    'url'
                ).then(() => {
                    res.status(302).redirect(`/url/${urlObject._id}`)
                })
            }
        }else{
            const returnData = await crawl.getAllData(url);
            urlObject = await db.createObject({
                url: url,
                type: 'page',
                ...returnData
            },'url');
            setTimeout(() => {
                res.status(302).redirect(`/url/${urlObject._id}`)
            }, 1000)
        }
            
        //     urlObject = await db.createObject({
        //         url: url,
        //         type: 'page',
        //         ...returnData
        //     }, 'url').then(() => {
        //         res.status(302).redirect(`/url/${urlObject._id}`)
        //     });
        // }else {
            
        //     else {
        //         const returnData = await crawl.getAllData(url);
        //         await db.updateObject(
        //             {url: url},
        //             {...returnData},
        //             'set',
        //             'url'
        //         ).then(() => {
        //             res.status(302).redirect(`/url/${urlObject._id}`)
        //         })
        //     }
        // }
    }catch (e){
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try{
        const urlObject = await db.findObject({_id: req.params.id}, 'url');
        res.status(200).send({
            data: urlObject
        });
    }catch(e){
        console.log(e);
    }
})

export default router;