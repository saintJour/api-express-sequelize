const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Rating, Document } = require('../../models');

router.post('/', async (req, res) => {
    let data = _.pick(req.body, [
        'DocumentId',
        'value'
    ]);

    if(_.isEmpty(data)){
        return res.status(400). json({message: 'Rating data not provided'});
    }

    if(!data.DocumentId){
        return res.status(400).json({message: 'Rating DocumentId not provided'});
    }

    if(!data.value){
        return res.status(400).json({message: 'Rating value not provided'});
    }

    data.UserId = req.UserId;

    console.log('DATA: ', data);

    try{
        let rating = await Rating.create(data);
        let sumValues = await Rating.sum('value',
            {
            where: {
                DocumentId: data.DocumentId
            }
        });
        let countRatings = await Rating.count({
            where: {
                DocumentId: data.DocumentId
            }
        });
        let newRating = sumValues/countRatings;
        let docToUpdate = await Document.findByPk(data.DocumentId);
        await docToUpdate.update({
            rating: newRating
        });
        res.status(201).json(rating);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: 'Failed to create Rating'});
    }
});

router.put('/:id', async (req, res) => {
    let data = _.pick(req.body, [
        'value'
    ]);

    if(_.isEmpty(data)){
        res.status(400). json({message: 'Rating data not provided'});
    }

    if(!data.value){
        res.status(400).json({message: 'Rating value not provided'});
    }

    try{
        let ratingToUpdate = await Rating.findByPk(req.params.id);

        if(ratingToUpdate.UserId == req.UserId){
            await ratingToUpdate.update(data);
            let sumValues = await Rating.sum('value',
                {
                where: {
                    DocumentId: ratingToUpdate.DocumentId
                }
            });
            let countRatings = await Rating.count({
                where: {
                    DocumentId: ratingToUpdate.DocumentId
                }
            });
            let newRating = sumValues/countRatings || null;
            let docToUpdate = await Document.findByPk(ratingToUpdate.DocumentId);
            await docToUpdate.update({
                rating: newRating
            });
            res.status(200).json(ratingToUpdate);
        }
        else{
            res.status(403).json({message: 'Unauthorized'});
        }
    }
    catch(e){
        return res.status(500).json({message: 'Failed to update Rating'});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        
        let ratingToDelete = await Rating.findByPk(req.params.id);

        if(ratingToDelete.UserId == req.UserId){
            let documentId = ratingToDelete.DocumentId;
            await ratingToDelete.destroy();
            let sumValues = await Rating.sum('value',
                {
                where: {
                    DocumentId: documentId
                }
            });
            let countRatings = await Rating.count({
                where: {
                    DocumentId: documentId
                }
            });
            let newRating = sumValues/countRatings || null;
            let docToUpdate = await Document.findByPk(documentId);
            await docToUpdate.update({
                rating: newRating
            });
            res.status(200).json({message: 'Deleted Rating'});
        }
        else{
            res.status(403).json({message: 'Unauthorized'});
        } 
    }
    catch(e){
        return res.status(500).json({message: 'Failed to delete Rating'});
    }
});

module.exports = router;