const db = require('../models');
const Tutorial = db.tutorial;

//Create and Save a new Tutorial
exports.create = (req, res) => {

    //Validate request
    if(!req.body.title){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    //Create a Tutorial

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published: false
    })

    //Save Tutorial
    tutorial.save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the tutorial."
        })
    })
};

//Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the tutorial."
        });
    });
};


//Find a single Tutorial with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: "Not found Tutorial with id: " + id});
        }
        else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving Tutorial with id: " + id})
    })
}


//Update a Tutorial by the id 
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });

        }
        else {
            res.send({message: "Tutorial was updated successfully!"})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    })
}


//Delete a Tutorial with the id
exports.delete = (req, res) => {

}

//Delete all Tutorials
exports.deleteAll = (req, res) => {

}

//Find all published Tutorials
exports.findAllPublished = (req, res) => {

}